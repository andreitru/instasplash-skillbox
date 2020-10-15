import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchToken } from '../api/tokenSlice'
import Cookies from 'js-cookie'

export const Auth = () => {
  const dispatch = useDispatch()
  const { tokenStatus, tokenError, currentPage } = useSelector(state => state.token)
  const code = window.location.search.split('code=')[1];

  useEffect(() => {
    if (tokenStatus === 'idle' && code) {
      dispatch(fetchToken(code));
    }
  }, [tokenStatus, code, dispatch])
  
  let content;

  if (tokenStatus === 'loading') {
    content = <div>Loading...</div>
  } else if (tokenStatus === 'succeeded' && Cookies.get('token') !== undefined) {
    content = <Redirect to={currentPage} />
  } else if (tokenStatus === 'failed') {
    content = <div>{tokenError}</div>
  }

  return (
    <div>
      {content}
    </div>
  )
}