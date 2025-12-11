import type { ReactNode } from 'react'

export default function Layout({
  children,
  a,
  b
}: {
  children: React.ReactNode
  a: ReactNode
  b: ReactNode
}) {
  return (
    <>
      {children}
      {a}
      {b}
    </>
  )
}
