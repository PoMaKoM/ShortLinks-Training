import React, { useState, useContext } from 'react'
import { Loading } from '../components/Loading';
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const message = useMessage()
  const { loading, request } = useHttp()
  const [link, setLink] = useState('')

  const sendLinkHandler = async () => {
    try {
      const data = await request('/api/link/generate', 'POST', { UrlLong: link }, {
        Authorization: `Bearer ${auth.token}`
      })
      history.push(`/detail/${data.link._id}`)
    } catch (e) {
      message(e)
    }
  }

  const keyPressHandler = (e) => {
    if (e.key === 'Enter') {
      sendLinkHandler(e)
    }
  }

  return (
    <div className="container">
      <div className="card blue-grey darken-4 hoverable white-text center">
        <div className="title">Создание ссылки</div>
        <div className="card-content row">
          <div className="col s12 m12 l10">
            <div className="input-field white-text">
              <input
                id="link"
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                onKeyPress={keyPressHandler}
                className="validate white-text" />
              <label
                htmlFor="link"
                className="white-text"
              >Вставьте ссылку</label>
              <span
                className="helper-text"
                data-error="Ссылка должна начинаться с 'http://' или 'https://'">
              </span>
            </div>
          </div>
          <div className="col s12 m12 l2">
            <button
              style={{ marginTop: '20px' }}
              disabled={loading}
              onClick={sendLinkHandler}
              className="waves-effect waves-dark btn blue">
              Сократить ссылку
                  </button>
          </div>
        </div>
        {loading && <Loading />}
      </div>
    </div >
  )
}