import { useState } from 'react'
import axiosRequest from '@services/axiosRequest'
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom'
import { Container, Alert, Form, Button } from 'react-bootstrap'

const Login = () => {
  const [alert, setAlert] = useState(false)
  const [queryParameters] = useSearchParams()
  const navigate = useNavigate()

  let register = false
  if (queryParameters.get('register')) {
    register = true
  }

  const userConnected = localStorage.getItem('token')
  if (userConnected) {
    return <Navigate to="/" replace />
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    register = false
    const data = new FormData(e.target)
    const logUser = { email: data.get('email'), password: data.get('password') }

    axiosRequest
      .post('/login', logUser)
      .then((response) => response.data)
      .then((res) => {
        localStorage.clear()
        localStorage.setItem('token', res.token)
        axiosRequest
          .get(`/user/${res.userId}`)
          .then((userData) => {
            localStorage.setItem('user', JSON.stringify(userData.data.user))
            if (userData.status === 200) {
              setTimeout(() => {
                navigate('/')
              }, 500)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data.message)
        } else if (err.request) {
          console.log(err.request)
        } else {
          console.log('Error', err.message)
        }
        setAlert(err.response.data.message)
        console.log(err.config)
      })
  }

  return (
    <Container>
      {alert && <Alert variant="warning">{alert}</Alert>}
      {register && (
        <Alert variant="success">
          Account successfully created ! You can now log in !
        </Alert>
      )}
      <h1>Log in</h1>
      <p>An account is required to access the blog.</p>
      <a href="/signup">No account yet ? Sign up here :)</a>
      <hr />
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSubmit">
          <Button variant="primary" type="submit">
            Log in
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default Login
