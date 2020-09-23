import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllPhotos, fetchPhotos } from './photosSlice'

export const PhotosList = () => {
  const dispatch = useDispatch()
  const photos = useSelector(selectAllPhotos)

  const photosStatus = useSelector(state => state.photos.status)
  const error = useSelector(state => state.photos.error)

  useEffect(() => {
    if (photosStatus === 'idle') {
      dispatch(fetchPhotos())
    }
  }, [photosStatus, dispatch])

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
    </article>
    ))
  } else if (photosStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section>
      <h2>Photos</h2>
      {content}
    </section>
  )
}