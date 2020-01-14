import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { LinkCard } from '../components/LinkCard'

export const DetailPage = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [link, setLink] = useState(null)
  const message = useMessage()
  const linkId = useParams().id

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLink(fetched)
    } catch (e) {
      message(e)
    }
  }, [token, linkId, request, message])

  useEffect(() => {
    getLink()
  }, [getLink]);

  if (loading) {
    return <Loader />
  }

  return (
    <div className="container">
      <div className="card blue-grey darken-4 hoverable white-text ">
        <div className="title center">Подробная информация</div>
        <div className="card-content links-info">
          {!loading && link && <LinkCard link={link} />}
        </div>
      </div>
    </div>
  )
}