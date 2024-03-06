import { getBakeryStats, getSourceHTML } from '@/lib/info-getter';
import { CountUp } from './ui/count-up';
import { Separator } from './ui/separator';

export async function BakeryStats() {
  const html = await getSourceHTML();

  if (!html) {
    return (
      <div className='flex w-full border border-destructive items-center justify-center p-4 text-destructive rounded-lg mt-16'>
        There was an error while serving the bagels and baguettes...
      </div>
    );
  }

  const bakeryStats = getBakeryStats(html);

  return (
    <div className='flex gap-2 md:gap-16 justify-between'>
      <div className='md:px-4 flex-1'>
        <div className='flex items-center gap-4 justify-end'>
          <div className='text-right'>
            <p className='text-2xl md:text-5xl'>🥯</p>
            <p className='md:text-5xl font-semibold text-primary'>bagels</p>
          </div>
          <div>
            <CountUp
              className='text-4xl md:text-8xl font-bold font-mono'
              start={0}
              end={bakeryStats.bagels}
              duration={1}
            />
          </div>
        </div>
        <Separator className='my-2' />
        <ul>
          {Object.entries(bakeryStats.bageledOpponents).map(([opponent, value]) => (
            <li key={opponent} className='flex items-center justify-between'>
              <p className='font-bold text-muted-foreground/50 text-sm md:text-base'>{value}</p>
              <p className='font-semibold text-muted/90 text-sm md:text-base'>{opponent}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Separator orientation='vertical' />
      </div>
      <div className='md:px-4 flex-1'>
        <div className='flex items-center gap-4'>
          <div>
            <CountUp
              className='text-4xl md:text-8xl font-bold font-mono'
              start={0}
              end={bakeryStats.baguettes}
              duration={1}
            />
          </div>
          <div>
            <p className='text-2xl md:text-5xl'>🥖</p>
            <p className='md:text-5xl font-semibold text-primary'>baguettes</p>
          </div>
        </div>
        <Separator className='my-2' />
        <ul>
          {Object.entries(bakeryStats.baguettedOpponents).map(([opponent, value]) => (
            <li key={opponent} className='flex items-center justify-between'>
              <p className='font-semibold text-muted/90 text-sm md:text-base'>{opponent}</p>
              <p className='font-bold text-muted-foreground/50 text-sm md:text-base'>{value}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
