import { useState } from 'react'
import axiosRequest from '@services/axiosRequest'
import { useNavigate } from 'react-router-dom'
import { Container, Alert, Form, Button, Row, Col } from 'react-bootstrap'

const UserForm = (props) => {
  const { userData, isAdmin, methode } = props

  const [user, setUser] = useState(userData || {})
  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  const setFields = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const verifyPassword = (editUser) => {
    if (editUser.password && editUser.password !== '') {
      if (editUser.passwordConfirm === '') {
        setAlert('Please confirm your password.')
        return false
      }
      if (editUser.password !== editUser.passwordConfirm) {
        setAlert('Password and its confirmation do not match !')
        return false
      }
    }
    return true
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(e.target)
    let editUser = {}
    for (const entry of data.entries()) {
      editUser = { ...editUser, [entry[0]]: entry[1] }
    }

    try {
      if (verifyPassword(editUser)) {
        if (methode === 'add') {
          await axiosRequest
            .post('/users/add', editUser)
            .then((res) => navigate('/login?register=1'))
          window.location.reload(false)
        } else {
          await axiosRequest
            .put(`/users/${user._id}/edit`, editUser)
            .then((res) => navigate('/login?register=1'))
          window.location.reload(false)
        }
      }
    } catch (err) {
      setAlert(err.response.data.message)
      console.log(err)
    }
  }

  const onDelete = async (e) => {
    e.preventDefault()

    axiosRequest
      .delete(`/users/${user._id}/delete`)
      .then((res) => navigate('/'))
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Container>
      {alert && <Alert variant="warning">{alert}</Alert>}
      <Form
        onSubmit={onSubmit}
        method={methode === 'add' ? 'post' : 'put'}
        encType="multipart/form-data"
      >
        {methode === 'edit' && (
          <Form.Field
            id="userid"
            name="userid"
            control={Input}
            value={user.id}
            type="hidden"
          />
        )}
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Check
                inline
                type="radio"
                name="gender"
                label="Woman"
                value="female"
                required
              />
              <Form.Check
                inline
                type="radio"
                name="gender"
                label="Man"
                value="male"
              />
              <Form.Check
                inline
                type="radio"
                name="gender"
                label="Other"
                value="other"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicFirstname">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                placeholder="First name"
                value={user.firstname ?? ''}
                onChange={setFields}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                placeholder="Last name"
                value={user.lastname ?? ''}
                onChange={setFields}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                value={user.email ?? ''}
                onChange={setFields}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLanguage">
              <Form.Label>Language orientation</Form.Label>
              <Form.Select name="category" aria-label="Select option">
                <option disabled>Choose your favorite language</option>
                <option value="PHP">PHP</option>
                <option value="JS">JS</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                name="passwordConfirm"
                type="password"
                placeholder="Type your password again"
              />
            </Form.Group>
          </Col>
        </Row>
        {methode === 'edit' && (
          <Row>
            <Col>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Select a photo</Form.Label>
                <Form.Control type="file" name="photo" />
              </Form.Group>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <Form.Group controlId="formActions" className="mb-3">
              {methode === 'put' && isAdmin && (
                <Button variant="danger" onClick={onDelete}>
                  Delete user
                </Button>
              )}
              <Button variant="primary" type="submit">
                {methode === 'add' ? 'Register' : 'Modify informations'}
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default UserForm
