import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axiosRequest from '@services/axiosRequest'

const Post = ({ user }) => {
  const [likes, setLikes] = useState()
  const [post, setPost] = useState({})

  const postId = useParams()

  useEffect(() => {
    const getPost = (postId) => {
      try {
        axiosRequest
          .get(`/posts/post/${postId}`)
          .then((res) => res.data.post)
          .then((post) => {
            setPost(post)
          })
      } catch (err) {
        console.log(err)
      }
    }
    getPost(postId.id)
  }, [])

  console.log(post)

  return (
    <Container>
      <h1>Welcome aboard ! (Post)</h1>
      <p>A blog about web development & tech, all for CDA students !</p>
      <hr />
      <p>Work in progress.</p>
    </Container>
  )
}

export default Post
