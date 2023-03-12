import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  let { id } = useParams()

  return (
    <Container>
      <h1>Welcome aboard ! (User Profile infos)</h1>
      <p>A blog about web development & tech, all for CDA students !</p>
      <hr />
      <p>
        Work in progress [profile card (READ) + edit form (EDIT) + admin actions
        (EDIT, set isAdmin & DELETE)]
      </p>
      <a href={`/profile/${id}/edit`}>Edit link</a>
    </Container>
  )
}

export default UserProfile
