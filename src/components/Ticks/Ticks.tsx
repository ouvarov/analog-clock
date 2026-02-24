import s from './Ticks.module.scss';

const TICK_COUNT = 30;

export function Ticks() {
  return (
    <div className={s.ring}>
      {Array.from({ length: TICK_COUNT }, (_, i) => (
        <div className={s.tick} key={i} />
      ))}
    </div>
  );
}