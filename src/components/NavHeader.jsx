// Navigation
// ---- Logo à gauche
// ---- À droite: bouton "Liste", lien vers l'édition du profil (avatar de l'utilisateur connecté), déconnexion
// ---- Option admin: bouton "Ajouter un utilisateur" en plus
import { Component, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import axiosRequest from '@services/axiosRequest'

const NavHeader = ({ user }) => {
  const [authInfo, setAuthInfo] = useState({
    isLoggedIn: false,
    isAdmin: false,
  })
  const [categories, setCategories] = useState([])
  const { isLoggedIn, isAdmin, activeItem } = authInfo
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setAuthInfo({ isLoggedIn: true, isAdmin: user.isAdmin })
    }
  }, [user])

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

  useEffect(() => {
    getCategories()
  }, [])

  const logout = () => {
    localStorage.clear()
    setAuthInfo({ isLoggedIn: false, isAdmin: false, activeItem: '' })
    navigate('/login')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" name="home">
          KodesBlog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {isLoggedIn && (
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                {categories.map((category, key) => {
                  return (
                    <NavDropdown.Item
                      key={key}
                      href={`/categories/${category.slug}`}
                    >
                      {category.title}
                    </NavDropdown.Item>
                  )
                })}
              </NavDropdown>
            )}
          </Nav>
          {isLoggedIn ? (
            <Nav>
              <Nav.Link as={Link} to={`/profile/${user._id}`}>
                Profile
              </Nav.Link>
              <Nav.Link onClick={logout}>Log out</Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login">
                Log in
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavHeader
