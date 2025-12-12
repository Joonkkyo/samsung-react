'use client'
import type { Todo } from '@/serverActions/todo'
import ModalComponent from '@/components/Modal'
import type { ModalHandle } from '@/components/Modal'
import { useRef } from 'react'

export default function Modal({ todo }: { todo: Todo }) {
  const ref = useRef<ModalHandle | null>(null)
  return (
    <ModalComponent ref={ref}>
      <h2 onClick={() => ref.current?.close()}>{todo?.title}</h2>
    </ModalComponent>
  )
}
