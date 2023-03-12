import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Container,
  ButtonGroup,
  Button,
  Alert,
  Row,
  Col,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faPlus } from '@fortawesome/free-solid-svg-icons'
import PostCard from '@components/PostCard'
import axiosRequest from '@services/axiosRequest'

const Home = ({ user }) => {
  const [postsList, setPostsList] = useState({})
  const userConnected = localStorage.getItem('token')
  const location = useLocation()

  let message = false

  if (location.state) {
    message = location.state.message
  }

  const getPosts = async () => {
    try {
      await axiosRequest
        .get('/posts/all')
        .then((res) => res.data.fullData)
        .then((data) => {
          let posts = []
          data.map((post) => {
            posts.push(post)
          })
          setPostsList(posts)
        })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  let colCount = 0
  let row = '</Row><Row>'

  return (
    <Container>
      {message && <Alert variant="success">{message}</Alert>}
      <h1>Welcome aboard !</h1>
      <p>A blog about web development & tech, all for CDA students.</p>
      {!userConnected && (
        <ButtonGroup aria-label="Connection choices">
          <Button variant="info" as={Link} to="/login">
            <FontAwesomeIcon icon={faRightToBracket} /> Log in
          </Button>
          <Button variant="info" as={Link} to="/signup">
            <FontAwesomeIcon icon={faPlus} /> Sign up
          </Button>
        </ButtonGroup>
      )}
      {userConnected && postsList && (
        <Row>
          {postsList.length > 0 &&
            postsList.map((post, key) => {
              colCount = colCount === 3 ? 0 : colCount++
              return (
                <>
                  {colCount === 3 && { row }}
                  <Col>
                    <PostCard key={key} post={post} user={user} />
                  </Col>
                </>
              )
            })}
        </Row>
      )}
    </Container>
  )
}

export default Home
