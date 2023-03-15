import { useState, useEffect } from 'react'
import { Container, Col, Row, Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import axiosRequest from '@services/axiosRequest'
import formatPostDate from '@services/date.js'

const Post = ({ user }) => {
  const [likes, setLikes] = useState()
  const [post, setPost] = useState({})
  const [author, setAuthor] = useState({})
  const [category, setCategory] = useState({})

  const postId = useParams()
  const getAuthor = (authorId) => {
    try {
      axiosRequest
        .get(`/user/${authorId}`)
        .then((res) => res.data.user)
        .then((user) => {
          setAuthor(user)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const getCategory = (categoryId) => {
    try {
      axiosRequest
        .get(`/categories/id/${categoryId}`)
        .then((res) => res.data.category)
        .then((cat) => {
          setCategory(cat)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const deletePost = (e) => {
    e.preventDefault()

    axiosRequest.delete(`/posts/${postId.id}/delete`).then((res) =>
      navigate('/', {
        state: { message: 'Post successfully deleted !' },
      }),
    )
    window.location.reload(false)
  }

  useEffect(() => {
    const getPost = (postId) => {
      try {
        axiosRequest
          .get(`/posts/post/${postId}`)
          .then((res) => res.data.post)
          .then((post) => {
            getAuthor(post.author)
            getCategory(post.category)
            setPost(post)
          })
      } catch (err) {
        console.log(err)
      }
    }
    getPost(postId.id)
  }, [])

  return (
    <Container>
      <Row>
        <Col className="col-md-6">
          <p>{category.title}</p>
          <h1>{post.title}</h1>
          <p>
            {author.firstname} {author.lastname} on {formatPostDate(post.date)}
          </p>
        </Col>
        <Col
          className="col-md-6"
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <img
            src={post.image}
            alt={post.title}
            style={{ maxWidth: '350px', maxHeight: '200px' }}
          />
        </Col>
      </Row>
      <Row>
        <hr />
        <p>{post.content}</p>
      </Row>
      <Row>
        <Button variant="light" as={Link} to={`/`}>
          Back
        </Button>
        {/* 
        {user._id === post.author ||
          (user.isAdmin && (
            <>
        */}

        <Button as={Link} to={`/post/${postId.id}/edit`}>
          Edit
        </Button>
        <Button variant="danger" onClick={deletePost}>
          Delete
        </Button>
        {/* 
              </>
          ))}
              */}
      </Row>
    </Container>
  )
}

export default Post
