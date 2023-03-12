import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import UserForm from '@components/UserForm'

const Signup = ({ user }) => {
  const [alert, setAlert] = useState(false)

  const navigate = useNavigate()

  const userConnected = localStorage.getItem('token')
  if (userConnected) {
    return <Navigate to="/" replace />
  }

  return (
    <Container>
      <h1>Sign up</h1>
      <p>New student ? Sign up to access the blog !</p>
      <a href="/login">Already have an account ? Sign in !</a>
      <hr />
      <UserForm methode="add" isAdmin={user ? user.isAdmin : false} />
    </Container>
  )
}

export default Signup
