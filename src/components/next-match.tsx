import { getSourceHTML, parseNextMatchInfo } from '@/lib/info-getter';
import { cn } from '@/lib/utils';
import { MatchTime } from './match-time';

export async function NextMatch() {
  const html = await getSourceHTML();

  if (!html) {
    return <></>;
  }

  const matches = parseNextMatchInfo(html);

  if (!matches.length) {
    return (
      <div className='my-16'>
        <div className='border border-muted rounded-lg w-full'>
          <div className='w-full flex items-center justify-center p-8'>
            <p className='text-muted font-semibold'>There are no upcoming matches yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='my-8 md:my-16'>
      <div
        className={cn('border rounded-lg w-full px-8 pb-8 pt-4', matches.length ? 'border-primary' : 'border-muted')}
      >
        <h2 className='text-lg text-muted pb-4 font-semibold'>Upcoming</h2>
        <div className='w-full flex flex-col gap-8 items-center justify-center'>
          {matches.map((match, idx) => (
            <div
              key={`${match.tournament}_${idx}`}
              className='flex flex-col md:flex-row items-center w-full gap-2 md:gap-4 justify-between'
            >
              <div className='flex items-center md:items-baseline gap-2 text-center'>
                <p className='font-bold text-primary md:text-sm'>Iga Świątek</p>
                <p className='text-muted-foreground/50'>-</p>
                <p className='text-primary font-bold md:text-lg'>{match.opponent}</p>
              </div>
              <div className='w-full md:flex-1 min-w-[10px] h-[1px] bg-primary'></div>
              <p className='uppercase font-semibold text-center'>{match.tournament}</p>
              <div className='w-full md:flex-1 min-w-[10px] h-[1px] bg-primary'></div>
              <p className='font-semibold text-center'>{match.round}</p>
              <div className='w-full md:flex-1 min-w-[10px] h-[1px] bg-primary'></div>
              <p className='font-mono text-center'>
                {match.startTime ? <MatchTime timeString={match.startTime} /> : 'Unknown start time'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
