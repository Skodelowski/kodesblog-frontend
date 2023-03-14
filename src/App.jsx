import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '@pages/Home'
import Login from '@pages/Login'
import Signup from '@pages/Signup'
import EditPost from '@pages/EditPost'
import UserProfile from '@pages/UserProfile'
import UserProfileEdit from '@pages/UserProfileEdit'
import Category from '@pages/Category'
import Dashboard from '@pages/Dashboard'
import Post from '@pages/Post'
import NavHeader from '@components/NavHeader'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  return (
    <Router>
      <NavHeader user={currentUser} />
      <Routes>
        <Route exact path="" element={<Home user={currentUser} />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup user={currentUser} />} />
        <Route path="profile/:id" element={<UserProfile />} />
        <Route path="profile/:id/edit" element={<UserProfileEdit />} />
        <Route
          path="categories/:slug"
          element={<Category user={currentUser} />}
        />
        <Route
          path="post/create"
          element={<EditPost method="add" user={currentUser} />}
        />
        <Route
          path="post/:id/edit"
          element={<EditPost method="edit" user={currentUser} />}
        />
        <Route path="post/:id" element={<Post user={currentUser} />} />
        <Route path="dashboard" element={<Dashboard user={currentUser} />} />
      </Routes>
    </Router>
  )
}

export default App
