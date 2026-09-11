This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Daily PostHog report in Telegram

Vercel calls `/api/cron/posthog-report` every day at 06:00 UTC (09:00 Moscow
time). The report covers the complete previous day in the `Europe/Moscow` time
zone and compares it with the day before.

Add these server-only environment variables in Vercel Project Settings:

- `POSTHOG_PERSONAL_API_KEY` — a PostHog personal API key with query read access
- `POSTHOG_PROJECT_ID` — the numeric PostHog project ID
- `POSTHOG_HOST` — optional; defaults to `https://eu.posthog.com`
- `TELEGRAM_BOT_TOKEN` — the token issued by BotFather
- `TELEGRAM_CHAT_ID` — the destination user, group, or channel ID
- `CRON_SECRET` — a random value of at least 16 characters

To test the production endpoint manually:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
  https://YOUR_DOMAIN/api/cron/posthog-report
```
