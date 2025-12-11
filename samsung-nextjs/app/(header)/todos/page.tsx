import { fetchTodos } from '@/serverActions/todo'
import Link from 'next/link'

export default async function Page() {
  const todos = await fetchTodos()
  return (
    <>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
