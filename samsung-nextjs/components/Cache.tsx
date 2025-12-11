import { cacheLife, cacheTag } from 'next/cache'

export default async function Cache() {
  'use cache'
  cacheLife({
    stale: 1,
    revalidate: 1,
    expire: 1
  })
  cacheTag('Cache Component Test', 'Extra Cache Tag!')
  const date = new Date().toISOString()
  return <p>{date}</p>
}
