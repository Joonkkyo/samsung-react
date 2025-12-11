'use cache'
import axios from 'axios'

export interface Movie {
  Title: string
  Poster: string
  Plot: string
}

export async function fetchMovieDetails(movieId: string) {
  const { data: movie } = await axios.get<Movie>(
    `https://omdbapi.com?apikey=7035c60c&i=${movieId}`
  )
  return movie
}

export async function updateMovieDetails() {}
