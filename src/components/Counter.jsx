import { useState, useEffect } from "react";
import { content } from "../data/content";

function Counter({ compact = false }) {
  const [elapsed, setElapsed] = useState(getElapsed());

  function getElapsed() {
    const start = new Date(content.startDate);
    const now = new Date();
    const diffMs = now - start;

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;
    const hours = totalHours % 24;

    return { months, days, hours };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getElapsed());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <span className="font-serif text-gold animate-heartbeat inline-block">
        {elapsed.months}mo {elapsed.days}d
      </span>
    );
  }

  return (
    <div className="flex items-baseline gap-2 sm:gap-3 justify-center flex-wrap">
      <TimeUnit value={elapsed.months} label="months" />
      <TimeUnit value={elapsed.days} label="days" />
      <TimeUnit value={elapsed.hours} label="hours" />
    </div>
  );
}

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-serif text-3xl sm:text-4xl text-gold animate-heartbeat leading-none">
        {value}
      </span>
      <span className="text-xs sm:text-sm text-warm-gray mt-1 font-sans tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
}

export default Counter;
