import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import styled from 'styled-components'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import RedirectGoogle from './pages/RedirectGoogle'
import RedirectGithub from './pages/RedirectGithub'

function App() {
  const { user } = useAuthContext()

  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/redirect/google"
            element={!user ? <RedirectGoogle /> : <Navigate to="/" />}
          />
          <Route
            path="/redirect/github"
            element={!user ? <RedirectGithub /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter >
    </ AppContainer>
  )
}

const AppContainer = styled.div`
display: flex;
justify-content: center;
width: 100vw;
height: 100vh;
`

export default App
