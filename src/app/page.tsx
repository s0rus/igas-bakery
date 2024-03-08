import { BakeryStats } from '@/components/bakery-stats';
import { NextMatch } from '@/components/next-match';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between container'>
      <div className='w-full pt-16 mb-8'>
        <div className='flex justify-between text-2xl md:text-6xl lg:text-7xl xl:text-8xl font-mono font-bold uppercase'>
          <p>Iga&apos;s</p>
          <p>bakery</p>
          <p>2024</p>
        </div>
        <Suspense fallback={'Loading...'}>
          <NextMatch />
          <BakeryStats />
        </Suspense>
      </div>
      <div className='w-full mt-auto mb-4'>
        <blockquote className='border-l-2 pl-6 italic text-muted text-justify'>
          <p className='italic font-bold font-mono'>from wikipedia:</p>
          <p>
            <span className='font-semibold'>Bagel</span>: Colloquial term for winning or losing a set 6-0 (the shape of
            the zero being reminiscent of the round shape of a bagel).
          </p>
          <p>
            <span className='font-semibold'>Breadstick</span>: Colloquial term for winning or losing a set 6-1, with the
            straight shape of the one supposedly being reminiscent of the straight shape of a breadstick.
          </p>
        </blockquote>
      </div>
    </main>
  );
}
