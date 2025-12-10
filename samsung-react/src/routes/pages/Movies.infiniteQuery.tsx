import { useState, useEffect, Fragment } from 'react'
import { useInfiniteQuery, infiniteQueryOptions } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import Loader from '@/components/Loader'

export interface ResponseValue {
  Search: SimpleMovie[]
  totalResults: string
  Response: string
}

export interface SimpleMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies() {
  const { ref, inView } = useInView({
    rootMargin: '0px 0px 500px 0px' // 인식 범위 조정
  })
  const [inputText, setInputText] = useState('')
  const [searchText, setSearchText] = useState('')

  const options = infiniteQueryOptions<ResponseValue>({
    queryKey: ['movies', searchText],
    queryFn: async ({ pageParam }) => {
      const { data: page } = await axios.get(
        `https://omdbapi.com?apikey=7035c60c&s=${searchText}&page=${pageParam}`
      )
      return page
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: Boolean(searchText),
    // select: data => {
    //   return data.Search.filter((movie, index, self) => {
    //     return self.findIndex(m => m.imdbID === movie.imdbID) === index
    //   })
    // },
    placeholderData: prev => prev, // 기존 데이터 유지하도록 처리 (재검색시 깜빡임 방지)
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const maxPage = Math.ceil(Number(lastPage.totalResults) / 10) // 검색 결과 => '632' => 632 => 64
      return allPages.length < maxPage ? allPages.length + 1 : null
    }
  })

  const { data, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery(options)

  function searchMovies() {
    setSearchText(inputText)
  }

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

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
        {data?.pages.map((page, index) => {
          return (
            <Fragment key={index}>
              <li>----------- {index + 1} -----------</li>
              {page.Search?.map(movie => {
                return <li key={movie.imdbID}>{movie.Title}</li>
              })}
            </Fragment>
          )
        })}
      </ul>
      <button // 참조를 걸어놓은 요소는 조건부 렌더링하면 안됨
        ref={ref}
        style={{
          display: isFetching || !searchText || !hasNextPage ? 'none' : 'block'
        }}>
        다음 페이지
      </button>
    </>
  )
}
