import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Loader } from './components/Loader'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import 'materialize-css'

function App() {
  const { login, logout, token, userId, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      login, logout, token, userId, isAuthenticated
    }}>
      <Router>
        <div className="body">
          <nav className="nav-wrapper transparent z-depth-0">
            <NavBar />
          </nav>
          <div className="content">
            {routes}
          </div>
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App