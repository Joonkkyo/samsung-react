import Cache from '@/components/Cache'
import Delay from '@/components/Delay'
import Loader from '@/components/Loader'
import { Suspense } from 'react'
import UpdateTagButton from './UpdateTagButton'

export default async function Page() {
  // GET 요청에 body를 포함하면 에러가 발생하므로 옵션에서 제거합니다.
  const res = await fetch('https://omdbapi.com?apikey=7035c60c&s=batman', {
    headers: {},
    cache: 'force-cache'
  })
  const { Search: movies } = await res.json()
  return (
    <>
      <h1>Cache Page!</h1>
      <UpdateTagButton />
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
        <Delay time={10000}>
          <Cache />
        </Delay>
      </Suspense>
    </>
  )
}
