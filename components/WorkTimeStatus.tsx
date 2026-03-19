"use client";

import { useEffect, useMemo, useState } from "react";

type WorkStatus = "work" | "closed" | "weekend";

const TIME_ZONE = "Europe/Minsk";
const START_HOUR = 10;
const END_HOUR = 18;

function getMinskDateParts(now: Date) {
  const weekday = new Intl.DateTimeFormat("ru-RU", {
    timeZone: TIME_ZONE,
    weekday: "long",
  }).format(now);

  const hourString = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    hour12: false,
  }).format(now);

  const minute = new Intl.DateTimeFormat("ru-RU", {
    timeZone: TIME_ZONE,
    minute: "2-digit",
  }).format(now);

  return {
    weekday,
    hour: Number(hourString),
    minute,
  };
}

function getStatus(weekday: string, hour: number): WorkStatus {
  const weekend = weekday === "суббота" || weekday === "воскресенье";
  if (weekend) return "weekend";
  if (hour >= START_HOUR && hour < END_HOUR) return "work";
  return "closed";
}

function getStatusLabel(status: WorkStatus) {
  if (status === "work") return "Работаем";
  if (status === "weekend") return "Выходной";
  return "Закрыто";
}

function getStatusClasses(status: WorkStatus) {
  if (status === "work") {
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
  }
  if (status === "weekend") {
    return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
  }
  return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300";
}

function getDotClasses(status: WorkStatus) {
  if (status === "work") return "bg-emerald-500";
  if (status === "weekend") return "bg-amber-500";
  return "bg-rose-500";
}

interface WorkTimeStatusProps {
  className?: string;
}

export default function WorkTimeStatus({ className = "" }: WorkTimeStatusProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const data = useMemo(() => {
    const parts = getMinskDateParts(now);
    const status = getStatus(parts.weekday, parts.hour);
    return {
      ...parts,
      status,
      statusLabel: getStatusLabel(status),
      statusClasses: getStatusClasses(status),
    };
  }, [now]);

  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-3 ${className}`}
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">Минск</span>
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${data.statusClasses}`}>
          <span className="inline-flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${getDotClasses(data.status)}`} />
            {data.statusLabel}
          </span>
        </span>
      </div>
      <p className="text-sm text-black dark:text-white font-medium">
        {data.weekday}, {String(data.hour).padStart(2, "0")}:{data.minute}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        График: Пн-Пт 10.00-18.00, Сб-Вс - выходной
      </p>
    </div>
  );
}

