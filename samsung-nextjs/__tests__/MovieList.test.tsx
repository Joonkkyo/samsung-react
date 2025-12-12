import { render, screen, waitFor } from '@testing-library/react'
import MovieList from '@/components/MovieList'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import userEvent from '@testing-library/user-event'
import type { Movie } from '@/components/movie'

const mockedAvengersMovies = [
  { imdbID: '1', Title: 'Avengers: Infinity War' },
  { imdbID: '2', Title: 'Avengers: Endgame' }
]
const mockedBatmanMovies = [
  { imdbID: '1', Title: 'Batman Begins' },
  { imdbID: '2', Title: 'The Batman' }
]
const getMockedResponse = (mockedMovies: Movie[]) => ({
  Search: mockedMovies,
  totalResults: '2',
  Response: 'True'
})

describe('MovieList', () => {
  const server = setupServer() // 서버 생성
  beforeAll(() => server.listen()) // 모든 테스트 전에 서버 시작
  afterEach(() => server.resetHandlers()) // 각 테스트 후에 핸들러 재설정
  afterAll(() => server.close()) // 모든 테스트 후에 서버 종료

  test('영화 목록을 출력해야 합니다.', async () => {
    server.use(
      http.get('https://omdbapi.com', () => {
        return HttpResponse.json(getMockedResponse(mockedAvengersMovies))
      })
    )
    render(<MovieList />)
    waitFor(() => {
      expect(screen.getByText('Avengers: Infinity War')).toBeInTheDocument()
      expect(screen.getByText('Avengers: Endgame')).toBeInTheDocument()
      expect(screen.getByText('Batman')).toBeInTheDocument()
    })
  })

  test('영화 제목을 입력하고 엔터키를 누르면, 영화 목록을 출력합니다.', async () => {
    const user = userEvent.setup()
    let requestUrl = ''
    server.use(
      http.get('https://omdbapi.com/', ({ request }) => {
        requestUrl = request.url
        return HttpResponse.json(getMockedResponse(mockedBatmanMovies))
      })
    )
    render(<MovieList />)
    const searchInput = screen.getByPlaceholderText('영화 제목을 입력하세요!')
    await user.type(searchInput, 'batman{Enter}')
    const url = new URL(requestUrl)
    expect(url.searchParams.get('s')).toBe('batman')
  })
})
