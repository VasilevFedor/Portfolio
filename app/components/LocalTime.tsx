"use client";

import { useEffect, useState } from "react";

const TZ = "Europe/Moscow"; // St. Petersburg shares Moscow time

function format() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: TZ,
  }).format(new Date());
}

export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums">
      {time ?? "—"} in St. Petersburg
    </span>
  );
}
