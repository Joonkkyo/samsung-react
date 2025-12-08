import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import MovieDetails from './pages/MovieDetails'
import { requiresAuth } from './loaders/requiresAuth'

const router = createBrowserRouter([
    {
        path: '/',
        // element: <Home />,
        Component: Home
    },
    {
        path: '/movies/:movieId', // 동적 세그먼트
        Component: MovieDetails,
        loader: requiresAuth
    },
    {
        path: '/signin',
        Component: SignIn
    }
])

export default function Router() {
    return <RouterProvider router={router} />
}