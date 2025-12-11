'use client'

import Image from 'next/image'
import axios from 'axios'
import MovieTitle from './MovieTitle'
import { use, useEffect, useState } from 'react'
import Link from 'next/link'

export interface Movie {
  Title: string
  Poster: string
  imdbID: string
}

export default function Page({
  params
}: {
  params: Promise<{ movieId: string }>
}) {
  const { movieId } = use(params) // 비동기 데이터 이행해주는 리액트 함수
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
          <MovieTitle movie={movie} />
          <Link href={`/poster/${movie.imdbID}`}>
            <Image
              src={movie.Poster}
              alt={movie.Title}
              width={200}
              height={300}
            />
          </Link>
        </>
      )}
    </>
  )
}
