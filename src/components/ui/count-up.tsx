'use client';
import { HTMLProps } from 'react';
import { useCountUp } from 'use-count-up';

interface CountUpProps extends HTMLProps<HTMLDivElement> {
  start: number;
  end: number;
  duration: number;
}

export function CountUp({ start, end, duration, ...rest }: CountUpProps) {
  const { value } = useCountUp({
    isCounting: true,
    start,
    end,
    duration,
    easing: 'easeOutCubic',
  });

  return <div {...rest}>{value}</div>;
}
