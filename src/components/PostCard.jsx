import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import axiosRequest from '@services/axiosRequest'

const PostCard = ({ post, user }) => {
  const [author, setAuthor] = useState()
  const [likeCount, setLikeCount] = useState(post.likeCount)
  const isAdmin = user.isAdmin

  // 15 words insight
  const limitTextLength = (text) => {
    let textWordsLength = text.split(' ')

    if (textWordsLength > 14)
      return textWordsLength.slice(0, 15).join(' ') + ' [...]'

    return text
  }

  const getAuthor = async () => {
    try {
      if (post && post.author) {
        await axiosRequest
          .get(`/user/${post.author}`)
          .then((res) => res.data.user)
          .then((user) => {
            let userFirstname = user.firstname
            let userLastname = user.lastname
            setAuthor(`${userFirstname} ${userLastname}`)
          })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const likePost = async (e) => {
    e.preventDefault()
    try {
      if (post) {
        await axiosRequest.put(`/posts/${post._id}/like`).then((data) => {
          let newLikeCount = data.data.data.likeCount
          setLikeCount(newLikeCount)
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deletePost = (e) => {
    e.preventDefault()

    axiosRequest.delete(`/posts/${post._id}/delete`).then((res) =>
      navigate('/', {
        state: { message: 'Post successfully deleted !' },
      }),
    )
    window.location.reload(false)
  }

  useEffect(() => {
    getAuthor()
  }, [])

  return (
    <Card
      bg="dark"
      text="white"
      style={{ width: '18rem', marginBottom: '2rem' }}
    >
      <Card.Header as="h5">{author}</Card.Header>
      {post.image && <Card.Img variant="center" src={post.image} />}
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{limitTextLength(post.content)}</Card.Text>
        <Button variant="info" as={Link} to={`/post/${post._id}`}>
          Read more
        </Button>
        {isAdmin && (
          <>
            <Button variant="light" as={Link} to={`/post/${post._id}/edit`}>
              <FontAwesomeIcon icon={faPen} />
            </Button>
            <Button variant="danger" onClick={deletePost}>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </>
        )}
      </Card.Body>
      <Card.Footer>
        <Card.Link
          href="#"
          style={{ textDecoration: 'none' }}
          onClick={likePost}
        >
          <FontAwesomeIcon icon={faHeart} /> {likeCount}
        </Card.Link>
        {/* For favorites
        <Card.Link href="#">
          <FontAwesomeIcon icon={faBookmark} />
        </Card.Link>
        */}
      </Card.Footer>
    </Card>
  )
}

export default PostCard
