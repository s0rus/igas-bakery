import { Skeleton } from './ui/skeleton';

export function ContentLoading() {
  return (
    <div className='flex flex-col gap-8'>
      <Skeleton className='w-full h-[240px] md:h-[122px] mt-8 md:mt-16' />
      <div className='flex gap-8 md:gap-16'>
        <Skeleton className='w-full h-28' />
        <Skeleton className='w-full h-28' />
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-col gap-4'>
          <Skeleton className='w-full h-4' />
          <Skeleton className='w-full h-4' />
          <Skeleton className='w-full h-4' />
          <Skeleton className='w-full h-4' />
          <Skeleton className='w-full h-4' />
        </div>
      </div>
    </div>
  );
}
