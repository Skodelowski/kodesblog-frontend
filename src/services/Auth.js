import { Outlet } from 'react-router-dom'
import NavHeader from '@components/NavHeader'

const Auth = () => {
  return (
    <>
      <NavHeader />
      <Outlet />
    </>
  )
}

export default Auth()