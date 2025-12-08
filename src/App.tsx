import { useState } from 'react'
import Counter from './components/Counter'

export default function App() {
  const [text, setText] = useState('')
  const [count, setCount] = useState(0)

  const increase = () => {
    console.log('increase 함수 호출!')
    setCount(c => c + 1)
  }

  return (
    <>
      <input
        placeholder="아무 값이나 입력해보세요!"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <Counter
        count={count}
        onIncrease={increase}
      />
    </>
  )
}