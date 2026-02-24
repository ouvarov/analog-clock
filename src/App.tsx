import s from './App.module.scss';
import { Clock } from '@/components/Clock/Clock';
import { useTimeMode } from '@/hooks/useClockTime';

export default function App() {
  const mode = useTimeMode();

  return (
    <div className={`mode-${mode} ${s.scene}`}>
      <Clock />
    </div>
  );
}