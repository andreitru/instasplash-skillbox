import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchToken } from '../api/tokenSlice'

export const Auth = () => {
  const dispatch = useDispatch()
  const { tokenStatus, tokenError } = useSelector(state => state.token)
  
  useEffect(() => {
    if (tokenStatus === 'idle') {
      dispatch(fetchToken());
    }
  }, [tokenStatus, dispatch])
  
  let content;

  if (tokenStatus === 'succeeded') {
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