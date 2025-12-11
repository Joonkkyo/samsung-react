import Image from 'next/image'
import axios from 'axios'
import MovieTitle from './MovieTitle'

export interface Movie {
  Title: string
  Poster: string
  Plot: string
}

export default async function Page({
  params
}: {
  params: Promise<{ movieId: string }>
}) {
  const { movieId } = await params
  const { data: movie } = await axios.get<Movie>(
    `https://omdbapi.com?apikey=7035c60c&i=${movieId}`
  )
  return (
    <>
      <MovieTitle movie={movie} />
      <Image
        src={movie.Poster}
        alt={movie.Title}
        width={200}
        height={300}
      />
    </>
  )
}
