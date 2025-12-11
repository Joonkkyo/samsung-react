'use server'
import { updateTag } from 'next/cache'

export async function handleUpdateTag(tag: string) {
  updateTag(tag)
}
