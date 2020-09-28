import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectPhotoById, fetchLikePhoto, fetchUnlikePhoto, fetchSinglePhoto, likedPhoto } from './photosSlice'

export const SinglePhotoPage = ({ match }) => {
  const dispatch = useDispatch()
  const { photoId } = match.params

  const photo = useSelector(state => selectPhotoById(state, photoId))
  const likeStatus = useSelector(state => state.photos.likeStatus)
  const singlePhotoStatus = useSelector(state => state.photos.fetchPhotoStatus)
  const error = useSelector(state => state.photos.likeError)
  const likes = photo.likes
  const id = photo.id

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
  if (likeStatus === 'loading') {
    isLiked = <p>Loading...</p>
    likeCounter = <p>Loading...</p>
  } else if (likeStatus === 'succeeded' || singlePhotoStatus === 'succeeded') {
    isLiked = <p>{photo.liked_by_user ? 'liked' : 'not liked'}</p>
    likeCounter = <p>{likes}</p>
    dispatch(likedPhoto({id, likes}))
  } else if (likeStatus === 'failed') {
    isLiked = <p>{error}</p>
    likeCounter = <p>{error}</p>
  }

  return (
    <section>
       {/* <Link to="/">Назад</Link> */}
       <button onClick={() => window.history.back()}>Назад</button>
      <article>
        <img src={photo.urls.regular} alt={photo.alt_description} 
          onLoad={() => dispatch(fetchSinglePhoto(id))
        }/>
        <a href={photo.user.links.html} target='_blank' rel='noreferrer noopener'><img src={photo.user.profile_image.medium} alt={photo.user.name}/>{photo.user.name}</a>
        <p>{photo.created_at}</p>
        {likeCounter}
        <button onClick={() => dispatch(fetchLikePhoto(id))}>
          Like
        </button>
        <button onClick={() => dispatch(fetchUnlikePhoto(id))}>
          Unlike
        </button>
        {isLiked}
      </article>
     
    </section>
  )
}