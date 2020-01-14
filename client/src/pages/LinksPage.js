import React, { useState, useContext, useCallback, useEffect } from 'react'
import { LinksList } from '../components/LinksList'
import { Loader } from '../components/Loader'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext'

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)
  const message = useMessage()

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched)
    } catch (e) {
      message(e)
    }
  }, [token, request, message])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="container">
      <div className="card blue-grey darken-4 hoverable white-text center">
        <div className="title">Ваши ссылки</div>
        <div className="card-content">
          {!loading && < LinksList links={links} />}
        </div>
      </div>
    </div>
  )
}