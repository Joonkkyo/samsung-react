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
  const [movie, setMovie] = useState<Movie | null>(null)
  const { movieId } = useParams()

  useEffect(() => {
    async function fetchMovie() {
      const { data: movie } = await axios.get(
        `https://omdbapi.com?apikey=7035c60c&i=${movieId}`
      )
      setMovie(movie)
    }
    fetchMovie()
  }, [movieId]) // 영화의 ID가 달라지면 함수를 다시 실행

  return (
    <>
      <h1>{movie?.Title}</h1>
      <img src={movie?.Poster}></img>
    </>
  )
}
