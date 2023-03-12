import { Container } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'

const Dashboard = ({ user }) => {
  const isAdmin = user.isAdmin

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return (
    <Container>
      <h1>Welcome aboard ! (Dashboard)</h1>
      <p>A blog about web development & tech, all for CDA students !</p>
      <hr />
      <p>
        Work in progress [Create user/create category (CREATE) + List of users/List of
        categories (READ) + edit user (EDIT, set isAdmin & DELETE) + others
        logs]
      </p>
    </Container>
  )
}

export default Dashboard
