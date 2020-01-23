import React from 'react'
import { useMessage } from '../hooks/message.hook';
import * as clipboard from "clipboard-polyfill";

export const LinkCard = ({ link }) => {
  const message = useMessage()
  const copyHandler = (e) => {
    let url = e.target.value
    if (url.startsWith('http://') || url.startsWith('https://')) {
      clipboard.writeText(url);
    } else {
      clipboard.writeText('http://' + url);
    }
    message("Скопировано!")
  };

  return (
    <>
      <p>Длинная ссылка: <a href={link.UrlLong} target="_blank" rel="noopener noreferrer">{link.UrlLong}</a>
        <button
          onClick={copyHandler}
          value={link.UrlLong}
          className="waves-effect waves-dark btn blue btn-small">
          Скопировать
        </button></p>
      <p>Короткая ссылка: <a href={'http://' + link.UrlShort} target="_blank" rel="noopener noreferrer">{link.UrlShort}</a>
        <button
          onClick={copyHandler}
          value={link.UrlShort}
          className="waves-effect waves-dark btn blue btn-small">
          Скопировать
        </button></p>
      <p>Количество переходов: <strong>{link.redirects}</strong></p>
    </>

  )
}