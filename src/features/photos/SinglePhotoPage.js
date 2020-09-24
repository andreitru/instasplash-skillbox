import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectPhotoById } from './photosSlice'
import { fetchLikePhoto, fetchUnlikePhoto, fetchSinglePhoto } from './singlePhotoSlice'
import { likedPhoto } from '../photos/photosSlice'

export const SinglePhotoPage = ({ match }) => {
  const dispatch = useDispatch()
  const { photoId } = match.params

  const photo = useSelector(state => selectPhotoById(state, photoId))
  const singlePhoto = useSelector(state => state.singlePhoto)
  const status = useSelector(state => state.singlePhoto.status)
  const error = useSelector(state => state.singlePhoto.error)
  const likes = useSelector(state => state.singlePhoto.likes)
  
  if (!photo) {
    return (
      <section>
        <Link to="/">На главную страницу</Link>
        <h2>Фото не найдено!</h2>
      </section>
    )
  }

  let isLiked;
  let likeCounter;
  if (status === 'loading') {
    isLiked = <p>Loading...</p>
    likeCounter = <p>Loading...</p>
  } else if (status === 'succeeded') {
    isLiked = <p>{singlePhoto.isLiked ? 'liked' : 'not liked'}</p>
    likeCounter = <p>{singlePhoto.likes}</p>
    dispatch(likedPhoto({photoId, likes}))
  } else if (status === 'failed') {
    isLiked = <p>{error}</p>
    likeCounter = <p>{error}</p>
  }

  return (
    <section>
       <Link to="/">Назад</Link>
      <article>
        <img src={photo.urls.regular} alt={photo.alt_description} 
          onLoad={() => dispatch(fetchSinglePhoto(photoId))
        }/>
        {likeCounter}
        <button onClick={() => dispatch(fetchLikePhoto(photoId))}>
          Like
        </button>
        <button onClick={() => dispatch(fetchUnlikePhoto(photoId))}>
          Unlike
        </button>
        {isLiked}
      </article>
    </section>
  )
}