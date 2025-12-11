import axios from 'axios'
import Image from 'next/image'
import { Movie } from '../../movies/[movieId]/page'

export default async function Page({
  params
}: {
  params: Promise<{ posterId: string }>
}) {
  const { posterId } = await params
  const { data: movie } = await axios.get<Movie>(
    `https://omdbapi.com?apikey=7035c60c&i=${posterId}`
  )
  return (
    <>
      <Image
        src={movie.Poster.replace('SX300', 'SX1000')}
        alt={movie.Title}
        width={1000}
        height={1500}
      />
    </>
  )
}
