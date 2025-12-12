'use client'
import { useEffect, useState, useImperativeHandle, useRef } from 'react'
import type { ReactNode, RefObject, MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export interface ModalHandle {
  close: () => void
}
interface ModalProps {
  children: ReactNode
  animation?: {
    duration?: number
    ease?: string
  }
  ref?: RefObject<ModalHandle | null>
}

export default function Modal({ ref, children, animation = {} }: ModalProps) {
  const duration = animation.duration ?? 400
  const ease = animation.ease ?? 'ease-in-out'
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const router = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // 컴포넌트 마운트 시 상태 초기화 및 애니메이션 시작
    // requestAnimationFrame 내에서 비동기로 상태를 설정하여 경고 방지
    requestAnimationFrame(() => {
      setIsClosing(false)
      setIsVisible(false)
      // 다음 프레임에서 애니메이션 시작
      requestAnimationFrame(() => {
        setIsVisible(true)
      })
    })
    return () => {
      // 컴포넌트 언마운트 시 타이머 정리
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [])

  const handleClose = (e?: MouseEvent) => {
    e?.preventDefault()
    if (isClosing) return // 이미 닫히는 중이면 무시
    // 기존 타이머가 있으면 정리
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsClosing(true)
    setIsVisible(false)
    // 애니메이션 완료 후 네비게이션
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null
      router.back()
    }, duration)
  }

  useImperativeHandle(ref, () => ({
    close: () => handleClose()
  }))

  return (
    <div
      className={`fixed top-0 left-0 flex h-dvh w-dvw items-center justify-center transition-opacity ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        willChange: 'opacity',
        pointerEvents: isClosing ? 'none' : 'auto',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: ease
      }}>
      <Link
        className="absolute top-0 left-0 h-dvh w-dvw bg-black/50 transition-opacity"
        href="/todos"
        onClick={handleClose}
        style={{
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: ease
        }}
      />
      <div
        className={`relative z-10 max-h-[calc(100dvh-100px)] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-8 transition-all ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{
          willChange: 'transform, opacity',
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: ease
        }}>
        {children}
      </div>
    </div>
  )
}
