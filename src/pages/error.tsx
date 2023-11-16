import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export default function Error() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) return <div>{'401 Unauthorized'}</div>

    if (error.status === 404) return <div>{'404 not found'}</div>

    return (
      <div id='error-page'>
        <h1>Oops! {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
      </div>
    )
  }

  return (
    <div id='error-page'>
      <h1>Oops! Unexpected Error</h1>
      <p>Something went wrong.</p>
    </div>
  )
}
