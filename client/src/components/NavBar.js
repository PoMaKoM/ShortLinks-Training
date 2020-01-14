import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { NavLink, useHistory } from 'react-router-dom'
import logo from '../img/logo.png'

export const NavBar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = (e) => {
    e.preventDefault()
    auth.logout()
    history.push('/')
  }

  if (auth.isAuthenticated) {
    return (
      <div className="container">
        <ul className="left">
          <li><NavLink to="/create">Новая ссылка</NavLink></li>
          <li><NavLink to="/links">Список ссылок</NavLink></li>
        </ul>
        <a href="/" className="brand-logo center">
          <img className="logo" alt="logo" src={logo}></img>
        </a>
        <ul className="right">
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    )
  } else {
    return (
      <a href="/" className="brand-logo center">
        <img className="logo" alt="logo" src={logo}></img>
      </a>
    )
  }
}