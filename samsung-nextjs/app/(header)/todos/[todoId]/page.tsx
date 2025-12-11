import { fetchTodos } from '@/serverActions/todo'

export default async function Page({
  params
}: {
  params: Promise<{ todoId: string }>
}) {
  const { todoId } = await params
  const todos = await fetchTodos()
  const todo = todos.find(t => t.id === todoId)
  return <></>
}
