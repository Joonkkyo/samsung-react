import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

export interface Movie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export interface Rating {
  Source: string
  Value: string
}

export default function MovieDetails() {
  const { movieId } = useParams()

  const { data: movie, isFetching } = useQuery<Movie>({
    queryKey: ['movie', movieId], // queryKey가 변경될 때마다 query 함수 재실행
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 5000))
      const { data: movie } = await axios.get(
        `https://omdbapi.com?apikey=7035c60c&i=${movieId}`
      )
      return movie
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours, 데이터 캐싱 목적 (24시간동안 유지)
    enabled: false, // 컴포넌트 렌더링시 함수 바로 실행 x
    initialData: {
      // initialData가 있으니 query를 최초로 실행하지 않는다
      Title: 'Initial Movie Title',
      Poster: ''
    } as Movie
    // notifyOnChangeProps: ['data'],
    // select: movie => {
    //   return
    // }
  })

  // useEffect(() => {
  //   async function fetchMovie() {
  //     const { data: movie } = await axios.get(
  //       `https://omdbapi.com?apikey=7035c60c&i=${movieId}`
  //     )
  //     setMovie(movie)
  //   }
  //   fetchMovie()
  // }, [movieId]) // 영화의 ID가 달라지면 함수를 다시 실행

  return (
    <>
      <h1>{movie?.Title}</h1>
      <img src={movie?.Poster}></img>
    </>
  )
}
