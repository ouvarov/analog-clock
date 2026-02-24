import s from './Numbers.module.scss';

const PAIRS = [
  { left: '10', right: '4' },
  { left: '11', right: '5' },
  { left: '12', right: '6' },
  { left: '1', right: '7' },
  { left: '2', right: '8' },
  { left: '3', right: '9' },
];

export function Numbers() {
  return (
    <div className={s.ring}>
      {PAIRS.map(({ left, right }) => (
        <div className={s.pair} key={left}>
          <span className={s.digit}>{left}</span>
          <span className={s.digitBottom}>{right}</span>
        </div>
      ))}
    </div>
  );
}