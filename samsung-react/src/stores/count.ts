import { create } from 'zustand'
import { combine, persist, subscribeWithSelector } from 'zustand/middleware'

export const useCountStore = create(
  persist(
    // 로컬스토리지에 값 저장 (새로고침 후에도 유지)
    subscribeWithSelector(
      combine(
        // 타입 추론을 위해 필요
        {
          count: 0,
          double: 0 // count * 2
        },
        (set, get) => {
          return {
            increase: () => {
              const { count } = get()
              set({
                count: count + 1,
                double: count * 2
              })
            }
          }
        }
      )
    ),
    {
      name: 'countStore'
    }
  )
)

useCountStore.subscribe(
  state => state.count, // 선택자
  count => {
    useCountStore.setState({
      double: count * 2
    })
  } // 실행 함수
)
