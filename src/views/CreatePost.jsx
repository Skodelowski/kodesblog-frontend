import { Container } from 'react-bootstrap'
import PostForm from '@components/PostForm'

const CreatePost = ({ user }) => {

  return (
    <Container>
      <h1>Create a new post</h1>
      <p>Let's share about tech !</p>
      <hr />
      <PostForm methode="add" isAdmin={user ? user.isAdmin : false} />
    </Container>
  )
}

export default CreatePost
