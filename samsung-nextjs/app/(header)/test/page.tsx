'use client'
import { cachedAction, nonCachedAction } from '@/serverActions/test'
import { useState } from 'react'

export default function Page() {
  const [cachedResult, setCachedResult] = useState('')
  const [nonCachedResult, setNonCachedResult] = useState('')

  async function handleCachedAction() {
    const result = await cachedAction()
    setCachedResult(result)
  }
  async function handleNonCachedAction() {
    const result = await nonCachedAction()
    setNonCachedResult(result)
  }
  return (
    <div className="flex flex-col gap-2">
      <button onClick={handleCachedAction}>Call Cached({cachedResult})</button>
      <button onClick={handleNonCachedAction}>
        CallNonCached({nonCachedResult})
      </button>
    </div>
  )
}
