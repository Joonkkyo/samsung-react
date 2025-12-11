export default async function Cache() {
  'use cache'
  const date = new Date().toISOString()
  return <p>{date}</p>
}
