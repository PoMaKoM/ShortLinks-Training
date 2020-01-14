import React, { useState, useEffect, useContext } from 'react'
import img from '../img/authPic.png'
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import { Loading } from '../components/Loading';

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  });

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError]);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) { }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      message(data.message)
      auth.login(data.token, data.userId)
    } catch (e) { }
  }

  const enterHandler = e => {
    if (e.key === 'Enter') {
      loginHandler(e)
    }
  }

  return (
    <div className="centered">
      <div className="card blue-grey darken-4 hoverable white-text">
        <div className="card-title center">
          Авторизация
        </div>
        <div className="card-content">
          <div className="hide-on-med-and-down">
            <img className="main-pic" alt="main pic" src={img}></img>
          </div>

          <div className="input-field">
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={changeHandler}
              onKeyPress={enterHandler}
              className="validate white-text" />
            <label
              htmlFor="email"
            >Email</label>
            <span
              className="helper-text"
              data-error="Неверный Email">
            </span>
          </div>
          <div className="input-field">
            <input
              id="password"
              type="password"
              name="password"
              minLength="6"
              value={form.password}
              onChange={changeHandler}
              onKeyPress={enterHandler}
              className="validate white-text" />
            <label
              htmlFor="password"
            >Пароль</label>
            <span
              className="helper-text"
              data-error="Минимальна длинна пароля 6 символов">
            </span>
          </div>

          <div className="card-btns">
            <button
              disabled={loading}
              onClick={loginHandler}
              className="waves-effect waves-dark btn blue">
              Войти
            </button>
            <button
              disabled={loading}
              onClick={registerHandler}
              className="waves-effect waves-dark btn blue darken-1">
              Зарегистрироваться
            </button>
          </div>
          {loading && <Loading />}
        </div>
      </div>
    </div>
  )
}