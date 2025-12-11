'use client'
import { Movie } from './page.server'

export default function MovieTitle({ movie }: { movie: Movie }) {
  return <h1 onClick={() => console.log(movie.Title)}>{movie.Title}</h1>
}
