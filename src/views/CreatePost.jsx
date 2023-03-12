import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import PostForm from '@components/PostForm'

const Signup = ({ user }) => {
  const [alert, setAlert] = useState(false)

  const navigate = useNavigate()

  return (
    <Container>
      <h1>Create a new post</h1>
      <p>Let's share about tech !</p>
      <hr />
      <PostForm methode="add" isAdmin={user ? user.isAdmin : false} />
    </Container>
  )
}

export default Signup
