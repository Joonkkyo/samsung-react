import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex flex-wrap gap-2.5">
      <Link href="/">Home</Link>
      <Link href="/signin">Sign In</Link>
      <Link href="/movies">Movies</Link>
      <Link href="/movies/tt1877830">The Batman</Link>
      <Link href="/async">Async</Link>
      <Link href="/parallel">Parallel</Link>
      <Link href="/client">Client</Link>
      <Link href="/cache">Cache</Link>
      <Link href="/todos">Todo</Link>
      <Link href="/test">Test</Link>
    </header>
  )
}
