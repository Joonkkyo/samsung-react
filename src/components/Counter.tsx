function getDouble(count: number) {
    console.log('double 값 계산!')
    return count * 2
  }
  
  export default function Counter({
    count,
    onIncrease
  }: {
    count: number
    onIncrease: () => void
  }) {
    console.log('Counter 컴포넌트 렌더링!')
  
    const double = getDouble(count)
  
    return (
      <>
        <p>Count: {count}</p>
        <p>Double: {double}</p>
        <button onClick={onIncrease}>증가!</button>
      </>
    )
  }