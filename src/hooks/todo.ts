import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}

const api = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
  headers: {
    'content-type': 'application/json',
    apikey: 'KDT8_bcAWVpD8',
    username: 'KDT8_JoonkyoSeo'
  }
})

export function useFetchTodos() {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data: todos } = await api.get('/')
      return todos
    }
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ title }: { title: string }) => {
      const { data: todo } = await api.post('/', {
        title
      })
      return todo
    },
    onMutate: ({ title }) => {
      // 변이 함수가 실행되기 전에 호출되는 함수 (낙관적 업데이트 이전)
      const prevTodos = queryClient.getQueryData<Todo[]>(['todos']) // 기존 목록 가져오기
      if (prevTodos) {
        queryClient.setQueryData(
          // 낙관적 업데이트 진행
          ['todos'],
          [
            {
              id: Math.random().toString(), // 임시 id 지정
              title: title
            },
            ...prevTodos
          ]
        )
      }
      return prevTodos
    },
    onSuccess: (newTodo, _payload, prevTodos) => {
      // 변이 성공 시 캐시 무효화로 데이터 갱신
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
      if (prevTodos)
        queryClient.setQueryData(['todos'], [newTodo, ...prevTodos])
    },
    // 오류시 복구 작업 필요
    onError: (_error, _payload, prevTodos) => {
      if (prevTodos) {
        queryClient.setQueryData(['todos'], prevTodos)
      }
    },
    onSettled: () => {}
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todo: Todo) => {
      const { data: updatedTodo } = await api.put(`/${todo.id}`, {
        title: todo.title,
        done: todo.done
      })
      return updatedTodo
    },
    onMutate: todo => {
      const prevTodos = queryClient.getQueryData<Todo[]>(['todos'])
      if (prevTodos) {
        queryClient.setQueryData(
          ['todos'],
          prevTodos.map(t => {
            return t.id === todo.id ? todo : t
          })
        )
      }
      return prevTodos
    },
    onSuccess: (_updatedTodo, _todo, _prevTodos) => {},
    onError: (_error, _todo, prevTodos) => {
      if (prevTodos) {
        queryClient.setQueryData(['todos'], prevTodos)
      }
    },
    onSettled: (_updatedTodo, _error, _todo, _prevTodos) => {}
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todo: Todo) => {
      await api.delete(`/${todo.id}`)
      return todo
    },
    onMutate: todo => {
      const prevTodos = queryClient.getQueryData<Todo[]>(['todos'])
      if (prevTodos) {
        queryClient.setQueryData(
          ['todos'],
          prevTodos.filter(t => t.id !== todo.id)
        )
      }
      return prevTodos
    },
    onSuccess: () => {},
    onError: (_error, _todo, prevTodos) => {
      if (prevTodos) queryClient.setQueryData(['todos'], prevTodos)
    },
    onSettled: () => {}
  })
}
