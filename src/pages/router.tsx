import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Error from './error'
import RootLayout from './layout'
// import { Loading } from '@uikit'

const Home = lazy(() => import('./home'))

export default function Router() {
  return (
    <Suspense fallback={<div>{'Loading'}</div>}>
      <BrowserRouter>
        <Routes>
          <Route path='/' errorElement={<Error />} element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}
