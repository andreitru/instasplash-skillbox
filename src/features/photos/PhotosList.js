import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllPhotos, fetchPhotos } from './photosSlice'
import Cookies from 'js-cookie'
import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry from 'react-masonry-css'
import { formatRelative, subDays } from 'date-fns'

export const PhotosList = () => {
  const dispatch = useDispatch()
  const photos = useSelector(selectAllPhotos)
  const { status, error, page } = useSelector(state => state.photos)

  useEffect(() => {
    if (Cookies.get('token') !== undefined && status === 'idle') {
      dispatch(fetchPhotos(page))
    }
  }, [status, dispatch, page])

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
        style={(status === 'failed') ? {display: "block"} : {display: "none"}}>
        Error: {error}
      </div>
      <div 
        className="container"
        style={(status === 'failed') ? {display: "none"} : {display: "block"}}>
        <InfiniteScroll
          dataLength={photos.length}  
          next={() => dispatch(fetchPhotos(page))}
          hasMore={true}
          loader={<div className="lds-ripple"><div></div><div></div></div>}
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
                    href={photo.user.links.html} 
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