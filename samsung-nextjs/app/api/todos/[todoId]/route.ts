import { api } from '../todoApi'
import type { NextRequest } from 'next/server'

interface Context {
  params: Promise<{ todoId: string }>
}

interface PutRequestBody {
  title: string
  done: boolean
}

export async function PUT(request: NextRequest, { params }: Context) {
  const { todoId } = await params // 요청 파라미터
  const a = request.nextUrl.searchParams.get('a')
  const b = request.nextUrl.searchParams.get('b')
  console.log('searchParams:', a, b)
  const body = ((await request.json()) || {}) as PutRequestBody // 요청 body
  const { data: todo } = await api.put(`/${todoId}`, body)
  return Response.json(body)
}
