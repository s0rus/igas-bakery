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
    </main>
  );
}
