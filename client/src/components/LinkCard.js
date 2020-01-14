import React from 'react'
import { useMessage } from '../hooks/message.hook';
import * as clipboard from "clipboard-polyfill";

export const LinkCard = ({ link }) => {
  const message = useMessage()
  const copyHandler = (e) => {
    clipboard.writeText(e.target.value);
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
      <p>Короткая ссылка: <a href={link.UrlShort} target="_blank" rel="noopener noreferrer">{link.UrlShort}</a>
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