export default async function A() {
  await new Promise(resolve => setTimeout(resolve, 3000))
  return <h1>A Component!</h1>
}
