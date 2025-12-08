import { Link } from 'react-router'
import { useCountStore } from '@/stores/count'
import { useShallow } from 'zustand/shallow'

export default function Home() {
  const count = useCountStore(s => s.count)
  const increase = useCountStore(s => s.increase)

  return (
    <>
      <h1>Home Page!</h1>
      <h2 onClick={increase}>Count: {count}</h2>
      <Link to="/signin">Sign In</Link>
      <br />
      <Link to="/movies/tt0848228">Avengers</Link>
      <br />
      <Link to="/movies/tt1877830">Batman</Link>
    </>
  )
}
