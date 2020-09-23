import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchToken } from '../api/tokenSlice'
import fetch from 'node-fetch';
global.fetch = fetch;

export const Auth = () => {
  const dispatch = useDispatch()
  const tokenStatus = useSelector(state => state.token.tokenStatus)
  const tokenError = useSelector(state => state.token.tokenError)
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






  // const dispatch = useDispatch()
  // const authStatus = useSelector(state => state.photos.auth_status)
  // const tokenStatus = useSelector(state => state.photos.token_status)
  // const tokenError = useSelector(state => state.photos.token_error)

  // useEffect(() => {
  //   if (authStatus === 'succeeded') {
  //     dispatch(fetchToken());
  //   }
  // }, [authStatus, tokenError, tokenStatus, dispatch]
  // )

  // let content;

  // if (tokenStatus === 'succeeded') {
  //   content = <p>{console.log('tokenStatus', tokenStatus)}</p>
   
  // }
//   const dispatch = useDispatch()
//   const tokenStatus = useSelector(state => state.token.tokenStatus)
//   const tokenAdded = useSelector(state => state.token.tokenAdded)
//   const token = useSelector(state => state.token.token)

//   let content;

//   useEffect(() => {
//     if (tokenStatus === 'succeeded') {
//     dispatch(fetchToken())}
//   }, [tokenStatus, dispatch]
//   )

 

//   if (tokenAdded === 'succeeded') {
   
//     content = <Route>
//     <div>Auth</div>
//     <Redirect to="/" />
//     </Route> 
//   }
  

//   return (
//     <div>
//       Auth.js
//       {content}
//       {console.log('auth.js')}
//     </div>
    
//   )
  
// }

// store.subscribe(() => {
//   localStorage.setItem('token', JSON.stringify(store.getState()))
// })
  

//<Route>
//<div>Auth</div>
//<Redirect to="/" />
//</Route> 

