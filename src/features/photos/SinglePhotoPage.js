import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectPhotoById } from './photosSlice'

export const SinglePhotoPage = ({ match }) => {
  const { photoId } = match.params

  const photo = useSelector(state => selectPhotoById(state, photoId))

  if (!photo) {
    return (
      <section>
        <Link to="/">На главную страницу</Link>
        <h2>Фото не найдено!</h2>
      </section>
    )
  }

  return (
    <section>
       <Link to="/">Назад</Link>
      <article>
        <img src={photo.urls.regular} alt={photo.alt_descriptio} />
        <p>{photo.likes}</p>
      </article>
    </section>
  )

}