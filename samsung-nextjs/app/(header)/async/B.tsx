export default async function B() {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return <h1>B Component!</h1>
}
