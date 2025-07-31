import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from './pages/ErrorPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ErrorBoundary
      FallbackComponent={ErrorPage}
      onReset={() => window.location.replace("/")}
    >
    <Provider store={store}>
      <App />
    </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)