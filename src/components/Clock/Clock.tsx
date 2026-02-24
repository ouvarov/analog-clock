import s from './Clock.module.scss';
import { Hands } from '@/components/Hands/Hands';
import { Numbers } from '@/components/Numbers/Numbers';
import { Ticks } from '@/components/Ticks/Ticks';
import { useClockTime } from '@/hooks/useClockTime';

export function Clock() {
  const { secondDelay, minuteDelay, hourDelay } = useClockTime();

  return (
    <div className={s.frame}>
      <div
        className={s.body}
        style={{
          '--delay-second': secondDelay,
          '--delay-minute': minuteDelay,
          '--delay-hour': hourDelay,
        } as React.CSSProperties}
      >
        <Hands />
        <Numbers />
        <Ticks />
      </div>
    </div>
  );
}