import ThemeSwitchComponent from './components/common/themeSwitch/themeSwitchComponent'
import router from './router'
import { RouterProvider } from 'react-router-dom'

function App() {
  return <>
    <RouterProvider router={router} />
    <ThemeSwitchComponent />
  </>
}

export default App
