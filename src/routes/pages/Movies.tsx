import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Loader from '@/components/Loader'
import { useFetchMovies } from '@/hooks/movie'

export default function Movies() {
  const { ref, inView } = useInView({
    rootMargin: '0px 0px 500px 0px' // 인식 범위 조정
  })
  const {
    data,
    isFetching,
    fetchNextPage,
    inputText,
    setInputText,
    setSearchText
  } = useFetchMovies()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  function searchMovies() {
    setSearchText(inputText)
  }

  return (
    <>
      <input
        type="text"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        onKeyDown={e => {
          if (e.nativeEvent.isComposing) return
          if (e.key === 'Enter') {
            searchMovies()
          }
        }}
      />
      <button onClick={searchMovies}>검색!</button>

      {isFetching && (
        <Loader
          size={50}
          color="royalblue"
        />
      )}
      <ul>
        {data?.pages.map(page => {
          return page.Search.map(movie => {
            return <li key={movie.imdbID}>{movie.Title}</li>
          })
        })}
      </ul>
      <button onClick={() => fetchNextPage()}>다음 페이지</button>
    </>
  )
}
