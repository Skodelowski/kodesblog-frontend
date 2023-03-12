import { useEffect, useState } from 'react'
import axiosRequest from '@services/axiosRequest'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Form, Button, Row, Col } from 'react-bootstrap'
import TagsInput from '@components/TagsInput'

const PostForm = (props) => {
  const { isAdmin, method } = props

  const [post, setPost] = useState({})
  const [alert, setAlert] = useState(false)
  const [authorId, setAuthorId] = useState()
  const [categories, setCategories] = useState([])
  const [image, setImage] = useState({ preview: '', data: '' })
  const [postCategory, setPostCategory] = useState()

  const author = JSON.parse(localStorage.getItem('user'))._id

  const navigate = useNavigate()

  const postId = useParams()

  const getCategories = async () => {
    try {
      await axiosRequest
        .get('/categories')
        .then((res) => res.data.fullData)
        .then((data) => {
          let categories = []
          data.map((cat) => {
            categories.push(cat)
          })
          setCategories(categories)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const setFields = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    })
  }

  const handleChangeCategory = (e) => {
    e.preventDefault()
    setPostCategory(e.target.value)
  }

  const displayPreview = (e) => {
    e.preventDefault()
    const img = {
      preview: URL.createObjectURL(
        new Blob([e.target.files[0]], { type: e.target.files[0].type }),
      ),
      data: e.target.files[0],
    }
    setImage(img)
  }

  useEffect(() => {
    if (postId && postId.id) {
      const getPostData = async (postId) => {
        try {
          await axiosRequest
            .get(`/posts/post/${postId}`)
            .then((res) => res.data.post)
            .then((data) => {
              setPost(data)
              setImage({ preview: data.image })
              setPostCategory(data.category)
            })
        } catch (err) {
          console.log(err)
        }
      }
      getPostData(postId.id)
    }
    getCategories()
    if (method === 'add') setAuthorId(author)
    else setAuthorId(post.author)
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(e.target)
    let editPost = {}
    for (const entry of data.entries()) {
      editPost = { ...editPost, [entry[0]]: entry[1] }
    }

    editPost.author = author
    editPost.category = postCategory || null
    console.log(editPost)

    try {
      if (method === 'add') {
        await axiosRequest
          .post('/posts/add', editPost, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((res) =>
            navigate('/', {
              state: { message: 'Post successfully created !' },
            }),
          )
        window.location.reload(false)
      } else {
        await axiosRequest
          .put(`/posts/${post._id}/edit`, editPost)
          .then((res) =>
            navigate('/', {
              state: { message: 'Post successfully modified !' },
            }),
          )
        window.location.reload(false)
      }
    } catch (err) {
      setAlert(err.response.data.message)
      console.log(err.config)
    }
  }

  const onDelete = async (e) => {
    e.preventDefault()

    axiosRequest
      .delete(`/posts/${post._id}/delete`)
      .then((res) =>
        navigate('/', { state: { message: 'Post successfully deleted !' } }),
      )
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      {alert && <Alert variant="warning">{alert}</Alert>}
      <Form
        onSubmit={onSubmit}
        method={method === 'add' ? 'post' : 'put'}
        encType="multipart/form-data"
      >
        <Form.Text id="author" name="author" value={authorId} type="hidden" />
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="A nice title"
                value={post.title ?? ''}
                onChange={setFields}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="col-md-3">
            <Form.Select
              aria-label="Default select example"
              value={postCategory}
              onChange={handleChangeCategory}
            >
              <option>Choose a category</option>
              {categories.map((cat, key) => {
                return (
                  <option key={key} value={cat._id}>
                    {cat.title}
                  </option>
                )
              })}
            </Form.Select>
          </Col>
          <Col>
            <TagsInput postTags={post.tags} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="content"
                type="text"
                value={post.content || ''}
                onChange={setFields}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-8">
            <Row>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>
                    Select a photo to illustrate your post
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={displayPreview}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="col-md-4">
                <Form.Group className="mb-3" controlId="formBasicImageName">
                  <Form.Label>Image name</Form.Label>
                  <Form.Control
                    type="text"
                    name="imageName"
                    placeholder="Name of your image"
                    onChange={setFields}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicImageDesc">
                  <Form.Label>Image description</Form.Label>
                  <Form.Control
                    type="text"
                    name="imageDesc"
                    placeholder="Some alt text to explain the image"
                    onChange={setFields}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col>
            {image.preview && (
              <div className="preview-image">
                <img src={image.preview} width="100" />
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formActions" className="mb-3">
              {method === 'put' && isAdmin && (
                <Button variant="danger" onClick={onDelete}>
                  Delete post
                </Button>
              )}
              <Button variant="info" type="submit">
                {method === 'add' ? 'Publish' : 'Modify post'}
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default PostForm
