import Image from 'next/image'
import axios from 'axios'
import MovieTitle from './MovieTitle'
import { fetchMovieDetails } from '@/serverActions/movie'

export interface Movie {
  Title: string
  Poster: string
  Plot: string
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ movieId: string }>
}) {
  const { movieId } = await params
  const movie = await fetchMovieDetails(movieId)
  return {
    title: movie.Title,
    description: movie.Plot,
    openGraph: {
      type: 'website',
      title: movie.Title,
      description: movie.Plot,
      images: movie.Poster,
      url: `https://abc.com/movies/${movieId}`,
      siteName: '사이트 이름'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'movie.Title',
      description: 'movie.Plot',
      images: 'movie.Poster',
      site: '사이트 이름'
    }
  }
}

export default async function Page({
  params
}: {
  params: Promise<{ movieId: string }>
}) {
  const { movieId } = await params
  const movie = await fetchMovieDetails(movieId)
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
