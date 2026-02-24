import { useState, useEffect, useMemo } from 'react';

export type TimeMode = 'morning' | 'day' | 'evening' | 'night';

function getMode(hour: number): TimeMode {
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'day';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
}

interface ClockDelays {
  secondDelay: string;
  minuteDelay: string;
  hourDelay: string;
}

export function useClockTime() {
  const delays = useMemo<ClockDelays>(() => {
    const now = new Date();
    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hr = now.getHours() % 12;

    const totalSecondsInHour = min * 60 + sec;
    const totalSecondsIn12Hours = hr * 3600 + min * 60 + sec;

    // Offsets: at rotate(0) second hand points to 9 o'clock (=45sec),
    // hour/minute hands point to 6 o'clock (=half cycle)
    return {
      secondDelay: `-${sec + 15}s`,            // 15s = quarter of 60s cycle (9→12)
      minuteDelay: `-${totalSecondsInHour + 1800}s`,  // 1800s = half of 3600s (6→12)
      hourDelay: `-${totalSecondsIn12Hours + 21600}s`, // 21600s = half of 43200s (6→12)
    };
  }, []);

  return delays;
}

export function useTimeMode() {
  const [mode, setMode] = useState<TimeMode>(() => getMode(new Date().getHours()));

  useEffect(() => {
    const interval = setInterval(() => {
      setMode(getMode(new Date().getHours()));
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  return mode;
}