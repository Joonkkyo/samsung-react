import type { FormEvent } from 'react'
import api, { ACCESS_TOKEN_NAME } from '@/lib/api'
import { useNavigate, useSearchParams } from 'react-router'

export default function SignIn() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('id')
    const password = formData.get('pw')

    const { data } = await api.post('/auth/signin', {
      email,
      password
    })
    if (data.token) {
      localStorage.setItem(ACCESS_TOKEN_NAME, data.token)
      navigate(redirectTo || '/')
    }
  }

  return (
    <>
      <h1>Sign In Page!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="id"
        />
        <input
          type="password"
          name="pw"
        />
        <button type="submit">로그인</button>
      </form>
    </>
  )
}
