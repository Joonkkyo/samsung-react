import Cache from '@/components/Cache'
import Delay from '@/components/Delay'
import Loader from '@/components/Loader'
import { Suspense } from 'react'

export default function Page() {
  return (
    <>
      <h1>Cache Page!</h1>
      <Suspense fallback={<Loader />}>
        <Delay time={0}>
          <Cache />
        </Delay>
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Delay time={1000}>
          <Cache />
        </Delay>
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Delay time={2000}>
          <Cache />
        </Delay>
      </Suspense>
    </>
  )
}
