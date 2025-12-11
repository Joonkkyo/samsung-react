import Loader from '@/components/Loader'
import A from './A'
import B from './B'
import { Suspense } from 'react'

export default async function Page() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return (
    // 가장 마지막 렌더링되는 요소까지 기다린 다음 출력 => (3+1)초
    // Suspense 사용시 resolve되는 대로 요소 출력
    <>
      <h1>Async Page!</h1>
      <Suspense
        fallback={
          <Loader
            color="red"
            className="relative"
          />
        }>
        <A />
      </Suspense>
      <Suspense
        fallback={
          <Loader
            color="green"
            className="relative"
          />
        }>
        <B />
      </Suspense>
    </>
  )
}
