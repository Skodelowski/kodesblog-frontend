// Affichage principal
// Le blog est en accès privé : L'utilisateur doit être connecté, sinon redirection vers login/inscription
// Affiche la liste des posts
//import { useState, useEffect } from 'react'
//import axiosRequest from '../services/axiosRequest'
import { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, ButtonGroup, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faPlus } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const userConnected = localStorage.getItem('token')

  return (
    <Container>
      <h1>Welcome aboard !</h1>
      <p>A blog about web development & tech, all for CDA students.</p>
      {!userConnected && (
        <ButtonGroup aria-label="Connection choices">
          <Button as={Link} to="/login">
            <FontAwesomeIcon icon={faRightToBracket} /> Log in
          </Button>
          <Button as={Link} to="/signup">
            <FontAwesomeIcon icon={faPlus} /> Sign up
          </Button>
        </ButtonGroup>
      )}
    </Container>
  )
}

export default Home
