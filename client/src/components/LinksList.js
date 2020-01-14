import React from 'react'
import { Link } from 'react-router-dom'

export const LinksList = ({ links }) => {
  if (!links.length) {
    return <p className="centered">Вы не создали не одной сокращенной ссылки</p>
  }

  return (
    <table className="responsive-table">
      <thead>
        <tr>
          <th>№</th>
          <th>Длинная ссылка</th>
          <th>Короткая ссылка</th>
          <th>Количество переходов</th>
          <th>Подробнее</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.UrlLong}</td>
              <td>{link.UrlShort}</td>
              <td>{link.redirects}</td>
              <td>
                <Link to={`/detail/${link._id}`}>Открыть</Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}