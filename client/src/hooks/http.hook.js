import { useState, useCallback, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(url, { method, body, headers })
      const data = await response.json()

      if (!response.ok) {

        if (response.status === 401) {
          auth.logout()
        }

        if (data.errors) {
          throw new Error(data.errors[0].msg)
        } else {
          throw new Error(data.message || 'Произошла непредвиденная ошибка')
        }
      }

      setLoading(false)
      return data

    } catch (e) {
      setError(e.message)
      setLoading(false)
      throw e.message
    }
  }, [auth])

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}