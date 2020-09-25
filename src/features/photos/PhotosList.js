import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllPhotos, fetchPhotos } from './photosSlice'
import Cookies from 'js-cookie'

export const PhotosList = () => {
  const dispatch = useDispatch()
  const photos = useSelector(selectAllPhotos)
  const photosStatus = useSelector(state => state.photos.status)
  const error = useSelector(state => state.photos.error)
  const page = useSelector(state => state.photos.page)

  useEffect(() => {
    if (Cookies.get('token') !== undefined && photosStatus === 'idle') {
      dispatch(fetchPhotos(page))
    }
  }, [photosStatus, dispatch, page])

  let content

  if (photosStatus === 'loading') {
    content = <div>Loading...</div>
  } else if (photosStatus === 'succeeded') {
    content = photos.map(photo => (
    <article key={photo.id}>
      <Link to={`/photos/${photo.id}`}>
        <img src={photo.urls.small} alt={photo.alt_description}  />
      </Link>
      <p>{photo.likes}</p>
      <a href={photo.user.links.html} target='_blank' rel='noreferrer noopener'><img src={photo.user.profile_image.medium} alt={photo.user.name}/>{photo.user.name}</a>
      <p>{photo.created_at}</p>
    </article>
    ))
  } else if (photosStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section>
      <h2>Photos</h2>
      {content}
      <button onClick={() => dispatch(fetchPhotos(page))}>Загрузить ещё</button>
    </section>
  )
}