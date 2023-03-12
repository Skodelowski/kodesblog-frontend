import { Container } from 'react-bootstrap'
import PostForm from '@components/PostForm'

const EditPost = ({ method, user }) => {
  const title = method === 'add' ? 'Create a new post' : 'Edit a post'

  return (
    <Container>
      <h1>{title}</h1>
      <p>Let's share about tech !</p>
      <hr />
      <PostForm method={method} isAdmin={user ? user.isAdmin : false} />
    </Container>
  )
}

export default EditPost
