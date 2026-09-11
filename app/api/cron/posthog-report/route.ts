const MOSCOW_TIME_ZONE = "Europe/Moscow";
const REPORT_EVENTS = [
  "$pageview",
  "case_view",
  "case_click",
  "nav_click",
  "social_click",
] as const;

type ReportEvent = (typeof REPORT_EVENTS)[number];

type PostHogQueryResponse = {
  results?: unknown[][];
};

type DayMetrics = Record<ReportEvent, number> & {
  uniqueVisitors: number;
};

function emptyMetrics(): DayMetrics {
  return {
    "$pageview": 0,
    case_view: 0,
    case_click: 0,
    nav_click: 0,
    social_click: 0,
    uniqueVisitors: 0,
  };
}

function dateInMoscow(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: MOSCOW_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function shiftDate(date: string, days: number): string {
  const shifted = new Date(`${date}T12:00:00Z`);
  shifted.setUTCDate(shifted.getUTCDate() + days);
  return shifted.toISOString().slice(0, 10);
}

function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
}

function asNumber(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function trend(current: number, previous: number): string {
  if (current === previous) return "без изменений";
  if (previous === 0) return current > 0 ? "новое" : "без изменений";

  const percent = Math.round(((current - previous) / previous) * 100);
  return `${percent > 0 ? "+" : ""}${percent}%`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

async function queryPostHog(
  host: string,
  projectId: string,
  apiKey: string,
  startDate: string,
  endDate: string,
): Promise<PostHogQueryResponse> {
  const events = REPORT_EVENTS.map((event) => `'${event}'`).join(", ");
  const query = `
    SELECT
      toString(toDate(toTimeZone(timestamp, '${MOSCOW_TIME_ZONE}'))) AS day,
      event,
      properties.case_title AS case_title,
      count() AS event_count,
      uniqExact(distinct_id) AS unique_visitors
    FROM events
    WHERE
      toDate(toTimeZone(timestamp, '${MOSCOW_TIME_ZONE}')) >= toDate('${startDate}')
      AND toDate(toTimeZone(timestamp, '${MOSCOW_TIME_ZONE}')) < toDate('${endDate}')
      AND event IN (${events})
    GROUP BY day, event, case_title
    ORDER BY day, event, event_count DESC
  `;

  const response = await fetch(
    `${host}/api/projects/${encodeURIComponent(projectId)}/query/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`PostHog query failed (${response.status}): ${details}`);
  }

  return response.json() as Promise<PostHogQueryResponse>;
}

function buildReport(
  response: PostHogQueryResponse,
  reportDate: string,
  previousDate: string,
): string {
  const metrics = new Map<string, DayMetrics>([
    [reportDate, emptyMetrics()],
    [previousDate, emptyMetrics()],
  ]);
  const caseViews = new Map<string, number>();

  for (const row of response.results ?? []) {
    const [dayValue, eventValue, caseTitleValue, countValue, visitorsValue] = row;
    const day = String(dayValue ?? "");
    const event = String(eventValue ?? "") as ReportEvent;
    const dayMetrics = metrics.get(day);

    if (!dayMetrics || !REPORT_EVENTS.includes(event)) continue;

    const count = asNumber(countValue);
    dayMetrics[event] += count;

    if (event === "$pageview") {
      dayMetrics.uniqueVisitors += asNumber(visitorsValue);
    }

    if (day === reportDate && event === "case_view" && caseTitleValue) {
      const title = String(caseTitleValue);
      caseViews.set(title, (caseViews.get(title) ?? 0) + count);
    }
  }

  const current = metrics.get(reportDate) ?? emptyMetrics();
  const previous = metrics.get(previousDate) ?? emptyMetrics();
  const topCase = [...caseViews.entries()].sort((a, b) => b[1] - a[1])[0];

  const lines = [
    `<b>📊 Портфолио — ${formatDate(reportDate)}</b>`,
    "",
    `Посетители: <b>${current.uniqueVisitors}</b> (${trend(current.uniqueVisitors, previous.uniqueVisitors)})`,
    `Просмотры страниц: <b>${current.$pageview}</b> (${trend(current.$pageview, previous.$pageview)})`,
    `Открытия кейсов: <b>${current.case_view}</b> (${trend(current.case_view, previous.case_view)})`,
    `Клики по карточкам: <b>${current.case_click}</b> (${trend(current.case_click, previous.case_click)})`,
    `Переходы по соцсетям: <b>${current.social_click}</b> (${trend(current.social_click, previous.social_click)})`,
    `Клики по навигации: <b>${current.nav_click}</b> (${trend(current.nav_click, previous.nav_click)})`,
  ];

  if (topCase) {
    lines.push(
      "",
      `Популярный кейс: <b>${escapeHtml(topCase[0])}</b> — ${topCase[1]}`,
    );
  }

  return lines.join("\n");
}

async function sendTelegramMessage(
  botToken: string,
  chatId: string,
  text: string,
): Promise<void> {
  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Telegram send failed (${response.status}): ${details}`);
  }
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;

  if (
    !cronSecret ||
    request.headers.get("authorization") !== `Bearer ${cronSecret}`
  ) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const posthogApiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  const posthogProjectId = process.env.POSTHOG_PROJECT_ID;
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  const missing = [
    ["POSTHOG_PERSONAL_API_KEY", posthogApiKey],
    ["POSTHOG_PROJECT_ID", posthogProjectId],
    ["TELEGRAM_BOT_TOKEN", telegramBotToken],
    ["TELEGRAM_CHAT_ID", telegramChatId],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    return Response.json(
      { ok: false, error: `Missing environment variables: ${missing.join(", ")}` },
      { status: 503 },
    );
  }

  try {
    const today = dateInMoscow(new Date());
    const reportDate = shiftDate(today, -1);
    const previousDate = shiftDate(today, -2);
    const posthogHost = (process.env.POSTHOG_HOST ?? "https://eu.posthog.com").replace(
      /\/$/,
      "",
    );

    const data = await queryPostHog(
      posthogHost,
      posthogProjectId!,
      posthogApiKey!,
      previousDate,
      today,
    );
    const message = buildReport(data, reportDate, previousDate);

    await sendTelegramMessage(telegramBotToken!, telegramChatId!, message);

    return Response.json({ ok: true, reportDate });
  } catch (error) {
    console.error("Daily PostHog report failed", error);
    return Response.json(
      { ok: false, error: "Failed to send daily report" },
      { status: 500 },
    );
  }
}
