'use server'
import axios from 'axios'

export interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}

export const api = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
  headers: {
    'content-type': 'application/json',
    apikey: process.env.TODO_APIKEY,
    username: process.env.TODO_USERNAME
  }
})

export async function fetchTodos() {
  console.log('fetchTodos in server action!')
  const { data: todos } = await api.get('/')
  return todos
}
