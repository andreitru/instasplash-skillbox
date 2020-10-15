import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { utmSource } from '../../api/unsplashApi'
import { selectPhotoById, fetchLikePhoto, fetchUnlikePhoto, fetchSinglePhoto, getPhotoLikes, getFullSize } from './photosSlice'
import { formatRelative, subDays } from 'date-fns'
import { logIn } from '../../api/tokenSlice'

export const SinglePhotoPage = ({ match }) => {
  const dispatch = useDispatch()
  const { photoId } = match.params

  const photo = useSelector(state => selectPhotoById(state, photoId))
  const { likeStatus, likeError, fetchPhotoStatus, fetchPhotoError, isFullSize } = useSelector(state => state.photos)
  const { tokenStatus } = useSelector(state => state.token)

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
  let likeBtnClass;
  let likeCounter;

  if (likeStatus === 'loading' || fetchPhotoStatus === 'loading') {
    likeBtnClass = "like-btn-loader"
    likeCounter = <span>Loading...</span>
  } else if (likeStatus === 'succeeded' || fetchPhotoStatus === 'succeeded') {
    likeBtnClass = photo.liked_by_user ? `like-btn liked` : `like-btn unliked`
    likeCounter = <span>{likes}</span>
    dispatch(getPhotoLikes({id, likes}))
  } 
  
  if (likeError === 'Requires a bearerToken to be set.') {
    document.querySelector('#modal-window').classList.add('modal-active') 
  }
  
  return (
    <section>
      <div 
        className="error"
        style={(fetchPhotoStatus === 'failed' || (likeStatus === 'failed' && likeError !== 'Requires a bearerToken to be set.')) ? {display: "flex"} : {display: "none"}} 
        >Error: {fetchPhotoError} {likeError}
        <button 
          className="back-btn"
          onClick={() => window.history.back()} 
          >
        </button>
      </div>
      <div 
        className="single-photo-container"
        style={(fetchPhotoStatus === 'failed' || (likeStatus === 'failed' && likeError !== 'Requires a bearerToken to be set.')) ? {display: "none"} : {display: "block"}} 
        >
        <button 
          className="back-btn"
          onClick={() => tokenStatus === 'succeeded' ? window.location.replace('/') : window.history.back()} 
          >
        </button>

      <article className="photo-container">
        <figure className="figure">
          <div 
            className={isFullSize ? "img-wrapper-full-size" : "img-wrapper"}
          >
            <img 
              className={isFullSize ? "img-full-size" : "single-photo"} 
              src={photo.urls.regular} 
              alt={photo.alt_description} 
              onLoad={() => dispatch(fetchSinglePhoto(id))}
              onClick={() => dispatch(getFullSize())}
          />
          </div>
          
          <figcaption className="figcaption">
            {photo.alt_description}
          </figcaption>
        </figure>
        <div className="single-bottom">
          <div className="bottom-left">
            <a 
              className="single-profile-link" 
              href={photo.user.links.html+utmSource} target='_blank' 
              rel='noreferrer noopener'>
              <img 
                className="single-profile-img" 
                src={photo.user.profile_image.large} 
                alt={photo.user.name}
              />
              {photo.user.name}
            </a>
          </div>
          <div className="bottom-right">
            <button 
              className={likeBtnClass} 
              onClick={() => {photo.liked_by_user ? dispatch(fetchUnlikePhoto(id)) : dispatch(fetchLikePhoto(id))}}>
            </button>
            <p className="single-likes">
              {likeCounter}
            </p>
            <p className="date">
              {formatRelative(subDays(new Date(photo.created_at), 0), new Date())}
            </p>
          </div>
        </div>
        <div
          className="modal-window"
          id="modal-window"
        >
          <p 
            className="modal-text"
          >
            You need to <button 
                          className="modal-button" 
                          onClick={() => dispatch(logIn())}
                        >
                          Log in
                        </button>
          </p>
          <div
            className="modal-close"
            onClick={() => {
              document.querySelector('#modal-window').classList.remove('modal-active')
            }}
          >
            &times;
          </div>
        </div>
      </article>
      </div>
    </section>
  )
}