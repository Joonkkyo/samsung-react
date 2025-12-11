'use client'
import { signIn, signOut } from '@/app/serverActions/auth'

export default function Page() {
  return (
    <>
      <h1>Signin Page!</h1>
      <form action={signIn}>
        <input
          type="email"
          name="id"
          placeholder="ID"
        />
        <input
          type="password"
          name="pw"
          placeholder="Password"
        />
        <button type="submit">로그인!</button>
      </form>
      <button onClick={signOut}>로그아웃!</button>
    </>
  )
}
