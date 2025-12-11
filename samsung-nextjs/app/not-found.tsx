import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <h1>Not Found Page!</h1>
      <Link href="/">메인으로 이동하기</Link>
    </>
  )
}
