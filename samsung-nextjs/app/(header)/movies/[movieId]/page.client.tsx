'use client'
import Image from 'next/image'
import axios from 'axios'
import MovieTitle from './MovieTitle'
import { use, useEffect, useState } from 'react'

export interface Movie {
  Title: string
  Poster: string
}

export default function Page({
  params
}: {
  params: Promise<{ movieId: string }>
}) {
  const { movieId } = use(params)
  const [movie, setMovie] = useState<Movie | null>(null)
  useEffect(() => {
    async function fetchMovie() {
      const { data: movie } = await axios.get<Movie>(
        `https://omdbapi.com?apikey=7035c60c&i=${movieId}`
      )
      setMovie(movie)
    }
    fetchMovie()
  }, [movieId])

  return (
    <>
      {movie && (
        <>
          {' '}
          <MovieTitle movie={movie} />
          <Image
            src={movie.Poster}
            alt={movie.Title}
            width={200}
            height={300}
          />
        </>
      )}
    </>
  )
}
