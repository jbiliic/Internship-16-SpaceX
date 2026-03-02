import { useState, useEffect } from 'react';
import { intervalToDuration, parseISO, isBefore } from 'date-fns';
import { withLoading } from '../../hoc/withLoading';
import style from './Countdown.module.css';
interface CountdownProps {
  targetDate: string | null; 
}

const CountdownTimer = ({ targetDate }: CountdownProps) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer); 
  }, []);

  if (!targetDate) return <div className={style.launchTimer}>TBD</div>;

  const launchTime = parseISO(targetDate);
  const isPast = isBefore(launchTime, now);

  const duration = intervalToDuration({
    start: isPast ? launchTime : now,
    end: isPast ? now : launchTime,
  });

  const formatNum = (num: number | undefined) => 
    String(num ?? 0).padStart(2, '0');

  return (
    <div className={style.launchTimer}>
      <h3 className={style.tMinus}>{isPast ? "Time since launch" : "Time until launch"}</h3>
      <div className={style.timeGrid}>
        <div className={style.timeUnit}>
          <span className={style.unitValue}>{formatNum(duration.days)}</span>
          <span className={style.unitLabel}>DAYS</span>
        </div>
        <div className={style.timeUnit}>
          <span className={style.unitValue}>{formatNum(duration.hours)}</span>
          <span className={style.unitLabel}>HRS</span>
        </div>
        <div className={style.timeUnit}>
          <span className={style.unitValue}>{formatNum(duration.minutes)}</span>
          <span className={style.unitLabel}>MIN</span>
        </div>
        <div className={style.timeUnit}>
          <span className={style.unitValue}>{formatNum(duration.seconds)}</span>
          <span className={style.unitLabel}>SEC</span>
        </div>
      </div>
    </div>
  );
};

export const CountdownWithLoading = withLoading(CountdownTimer);