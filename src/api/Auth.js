import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchToken } from '../api/tokenSlice'
import Cookies from 'js-cookie'

export const Auth = () => {
  const dispatch = useDispatch()
  const { tokenStatus, tokenError } = useSelector(state => state.token)
  const code = window.location.search.split('code=')[1];

  useEffect(() => {
    if (tokenStatus === 'idle' && code) {
      dispatch(fetchToken(code));
    }
  }, [tokenStatus, code, dispatch])
  
  let content;

  if (tokenStatus === 'succeeded' && Cookies.get('token') !== undefined) {
    content = <Redirect to="/" />
  } else if (tokenStatus === 'failed') {
    content = <div>{tokenError}</div>
  }

  return (
    <div>
      {content}
    </div>
  )
}