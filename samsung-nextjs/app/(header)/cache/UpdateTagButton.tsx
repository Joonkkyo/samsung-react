'use client'
import { handleUpdateTag } from '@/serverActions/cache'

export default function UpdateTagButton() {
  return (
    <button onClick={() => handleUpdateTag('Cache Component Test')}>
      캐시 만료!
    </button>
  )
}
