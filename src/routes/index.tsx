import { createBrowserRouter, RouterProvider } from 'react-router'
import { requiresAuth } from './loaders/requiresAuth'
import { dynamic } from '@/lib/dynamic'

const router = createBrowserRouter([
  {
    path: '/',
    Component: dynamic(() => import('./pages/Home'))
  },
  {
    path: '/movies',
    Component: dynamic(() => import('./pages/Movies'))
  },
  {
    path: '/movies/:movieId', // 동적 세그먼트
    Component: dynamic(() => import('./pages/MovieDetails')),
    loader: requiresAuth
  },
  {
    path: '/signin',
    Component: dynamic(() => import('./pages/SignIn'))
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
