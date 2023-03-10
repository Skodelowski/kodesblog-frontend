import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import UserForm from '@components/UserForm'

const UserProfile = () => {
  return (
    <Container>
      <h1>Welcome aboard !</h1>
      <p>A blog about web development & tech, all for CDA students !</p>
    </Container>
  )
}

export default UserProfile
