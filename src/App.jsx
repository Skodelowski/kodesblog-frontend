import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '@pages/Home'
import Login from '@pages/Login'
import Signup from '@pages/Signup'
import UserProfile from '@pages/UserProfile'
import UserProfileEdit from '@pages/UserProfileEdit'
import Category from '@pages/Category'
import NavHeader from '@components/NavHeader'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')),
  )
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  const handleLoggedUser = (user) => {
    setCurrentUser(user)
  }

  return (
    <Router>
      <NavHeader user={currentUser} />
      <Routes>
        <Route exact path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup user={currentUser} />} />
        <Route path="profile/:id" element={<UserProfile />} />
        <Route path="profile/:id/edit" element={<UserProfileEdit />} />
        <Route path="categories/:slug" element={<Category />} />
      </Routes>
    </Router>
  )
}

export default App
