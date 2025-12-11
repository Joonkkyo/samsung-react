import { ReactNode } from 'react'
export default async function Delay({
  children,
  time = 1000
}: {
  children: ReactNode
  time?: number
}) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return <>{children}</>
}
