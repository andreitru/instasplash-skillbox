import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectPhotoById, fetchLikePhoto, fetchUnlikePhoto, fetchSinglePhoto, likedPhoto } from './photosSlice'
import { formatRelative, subDays } from 'date-fns'

export const SinglePhotoPage = ({ match }) => {
  const dispatch = useDispatch()
  const { photoId } = match.params

  const photo = useSelector(state => selectPhotoById(state, photoId))
  const {likeStatus, likeError, fetchPhotoStatus, fetchPhotoError } = useSelector(state => state.photos)
  
  if (!photo) {
    return (
      <section>
        <div className="error">
          <h2 className="error-title">Photo not found!</h2>
          <Link to="/" className="error-link">Go to main page</Link>
        </div>
      </section>
    )
  }

  const likes = photo.likes
  const id = photo.id
  let likeBtn;
  let likeCounter;
   if (likeStatus === 'succeeded' || fetchPhotoStatus === 'succeeded') {
    likeBtn = photo.liked_by_user ? `like-btn liked` : `like-btn unliked`
    likeCounter = <span>{likes}</span>
    dispatch(likedPhoto({id, likes}))
  }

  return (
    <section>
      <div 
        className="error"
        style={(fetchPhotoStatus === 'failed' || likeStatus === 'failed') ? {display: "block"} : {display: "none"}} 
        >Error: {fetchPhotoError} {likeError}
        <button 
          className="back-btn"
          onClick={() => window.history.back()} 
          >
        </button>
      </div>
      <div 
        className="single-photo-container"
        style={(fetchPhotoStatus === 'failed' || likeStatus === 'failed') ? {display: "none"} : {display: "block"}} 
        >
        <button 
          className="back-btn"
          onClick={() => window.history.back()} 
          >
        </button>

      <article className="photo-container">
        <figure className="figure">
          <img 
            className="single-photo" 
            src={photo.urls.regular} 
            alt={photo.alt_description} 
            onLoad={() => dispatch(fetchSinglePhoto(id))}
          />
          <figcaption className="figcaption">
            {photo.alt_description}
          </figcaption>
        </figure>
        <div className="single-bottom">
          <div className="bottom-left">
          <a 
            className="profile-link single-profile-link" 
            href={photo.user.links.html} target='_blank' 
            rel='noreferrer noopener'>
            <img 
              className="profile-img single-profile-img" 
              src={photo.user.profile_image.large} 
              alt={photo.user.name}
            />
            {photo.user.name}
          </a>
          </div>
          <div className="bottom-right">
            <button 
              className={likeBtn} 
              onClick={() => {photo.liked_by_user ? dispatch(fetchUnlikePhoto(id)) : dispatch(fetchLikePhoto(id))}}>
            </button>
            <p className="likes single-likes">
              {likeCounter}
            </p>
            <p className="date">
              {formatRelative(subDays(new Date(photo.created_at), 0), new Date())}
            </p>
          </div>
        </div>
      </article>
      </div>
    </section>
  )
}