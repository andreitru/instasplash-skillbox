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
  const photosStatus = useSelector(state => state.photos.status)
  const error = useSelector(state => state.photos.error)
  const page = useSelector(state => state.photos.page)

  useEffect(() => {
    if (Cookies.get('token') !== undefined && photosStatus === 'idle') {
      dispatch(fetchPhotos(page))
    }
  }, [photosStatus, dispatch, page])

  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    480: 1
  }

  return (
    
    <section>
      <div style={(photosStatus === 'failed') ? {display: "block"} : {display: "none"}} className="error">Error: {error}</div>
      <div style={(photosStatus === 'failed') ? {display: "none"} : {display: "block"}} className="container">
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
          <article key={photo.id} className="photo">
            <div className="top">
              <a href={photo.user.links.html} target='_blank' rel='noreferrer noopener' className="profile-link">
                <img src={photo.user.profile_image.medium} alt={photo.user.name} className="profile-img"/>
                {photo.user.name}
              </a>
            </div>
            <Link to={`/photos/${photo.id}`}>
              <img src={photo.urls.small} alt={photo.alt_description}/>
            </Link>
            <div className="bottom">
              <p className="likes">{photo.likes} likes</p>
              <p className="date">{formatRelative(subDays(new Date(photo.created_at), 0), new Date())}</p>
            </div>
          </article>))}
          
          </Masonry>
      </InfiniteScroll> 
      </div>
    </section>
  )
}