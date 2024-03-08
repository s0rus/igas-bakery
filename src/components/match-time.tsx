'use client';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

interface MatchTimeProps {
  timeString: string;
}

dayjs.extend(customParseFormat);

export function MatchTime({ timeString }: MatchTimeProps) {
  const parsedTime = dayjs(timeString, 'DD.MM. HH:mm');

  if (!parsedTime.isValid()) {
    return <>Unknown start time</>;
  }

  const formattedTime = parsedTime.format('DD/MM hh:mm A');

  return <>{formattedTime}</>;
}
