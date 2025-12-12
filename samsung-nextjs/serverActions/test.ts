'use server'

export async function cachedAction() {
  'use cache'
  const date = new Date().toISOString()
  console.log('cached', date)
  return date
}

export async function nonCachedAction() {
  const date = new Date().toISOString()
  console.log('non-cached', date)
  return date
}
