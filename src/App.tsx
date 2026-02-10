import { useContext, useEffect } from 'react'
import ScrollToTop from './components/ScrollToTop'
import useRouteElement from './useRouteElement'
import { ToastContainer } from 'react-toastify'
import { LocalStrogeEventTarget } from './utils/auth'
import { AppContext } from './Contexts/app.context'

function App() {
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStrogeEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStrogeEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  const routeElement = useRouteElement()
  return (
    <div>
      <ScrollToTop />
      {routeElement}
      <ToastContainer />
    </div>
  )
}

export default App
