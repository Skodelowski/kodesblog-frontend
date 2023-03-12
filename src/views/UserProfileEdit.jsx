import { Container } from 'react-bootstrap'

const UserProfileEdit = () => {
  return (
    <Container>
      <h1>Welcome aboard ! (Edit User form)</h1>
      <p>A blog about web development & tech, all for CDA students !</p>
      <hr />
      <p>
        Work in progress [Edit form if the user is the one connected OR the user
        connected is an admin (+ delete && set isAdmin)]
      </p>
    </Container>
  )
}

export default UserProfileEdit
