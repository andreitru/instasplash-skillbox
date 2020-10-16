import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllPhotos, fetchPhotos } from './photosSlice'
import { utmSource } from '../../api/unsplashApi'
import { logIn } from '../../api/tokenSlice'
import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry from 'react-masonry-css'
import { formatRelative, subDays } from 'date-fns'

export const PhotosList = () => {
  const dispatch = useDispatch()
  const photos = useSelector(selectAllPhotos)
  const { status, error, page } = useSelector(state => state.photos)
  const { isLoggedIn } = useSelector(state => state.token)

  useEffect(() => {
    if (status === 'idle' && isLoggedIn) {
      dispatch(fetchPhotos(page))
    }
  }, [status, dispatch, page, isLoggedIn])

  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    480: 1
  }

  return (
    <section>
      <div 
        className="error"
        style={(status === 'failed') ? {display: "flex"} : {display: "none"}}>
        Error: {error}
      </div>
      <div
        className="no-loggedin"
        style={!isLoggedIn && photos.length === 0 ? {display: "block"} : {display: "none"}}>
        <p className="no-loggedin-text">You need to Log in</p>
      </div>
      <div 
        className="container"
        style={(status !== 'failed' && (isLoggedIn || photos.length > 0)) ? {display: "block"} : {display: "none"}}>
        <InfiniteScroll
          dataLength={photos.length}  
          next={() => dispatch(fetchPhotos(page))}
          hasMore={isLoggedIn}
          scrollThreshold='80%'
          loader={<div className="lds-ripple"><div></div><div></div></div>}
          endMessage={
            <p 
              className="no-loggedin-text" 
              style={{"paddingTop": 0, "paddingBottom": "50px"}}>
                Please <button 
                          className="modal-button" 
                          onClick={() => dispatch(logIn())}
                        >
                          Log in
                        </button> to show more</p>
                      }
        >
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
      
            {photos.map(photo => (
              <article className="photo" key={photo.id}>
                <div className="top">         
                    <a 
                    className="profile-link" 
                    href={photo.user.links.html+utmSource} 
                    target='_blank' 
                    rel='noreferrer noopener'>
                    <img 
                      className="profile-img" 
                      src={photo.user.profile_image.medium} 
                      alt={photo.user.name}
                    />
                    {photo.user.name}
                  </a>      
                </div>
                <Link to={`/photos/${photo.id}`}>
                  <img 
                    src={photo.urls.small} 
                    alt={photo.alt_description}
                  />
                </Link>
                <div className="bottom">
                  <p className="likes">
                    {photo.likes} likes
                  </p>
                  <p className="date">
                    {formatRelative(subDays(new Date(photo.created_at), 0), new Date())}
                  </p>
                </div>
              </article>))}
          
          </Masonry>
      </InfiniteScroll> 
      </div>
    </section>
  )
}