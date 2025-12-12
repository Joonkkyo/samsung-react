// http://localhost:3000/api/todos
// http 메소드: GET, POST, PUT, DELETE, PATCH, OPTIONS...
import axios from 'axios'
import { NextRequest } from 'next/server'

const api = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
  headers: {
    'content-type': 'application/json',
    apikey: process.env.TODO_APIKEY,
    username: process.env.TODO_USERNAME
  }
})

export async function GET() {
  const { data: todos } = await api.get('/')
  return Response.json(todos)
}

export async function POST(request: NextRequest) {
  const { title } = (await request.json()) || {}
  const { data: todo } = await api.post('/', {
    title
  })
  return Response.json(todo)
}
