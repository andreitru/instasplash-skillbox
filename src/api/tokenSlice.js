import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { unsplash } from './unsplashApi'
import { authenticationUrl } from './unsplashApi'
import { isLoggedIn, currentPage } from '../app/sessionStorage'
import { SITE_URL } from '../api/keys'
import fetch from 'node-fetch'
global.fetch = fetch;

const initialState = {
  tokenStatus: 'idle',
  tokenError: null,
  isLoggedIn,
  currentPage
}

export const fetchToken = createAsyncThunk('token/fetchToken', async (code) => {
  const response = await unsplash.auth.userAuthentication(code).then(res => res.json()).then(json => json)
  return response
})

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    logOut(state, action) {
      Cookies.remove('token')
      unsplash.auth.setBearerToken(null)
      state.isLoggedIn = false
      window.location.reload()
    },
    logIn(state, action) {
      state.currentPage = window.location.href.split(SITE_URL)[1]
      window.location.assign(authenticationUrl)
    }
  },
  extraReducers: {
    [fetchToken.pending]: (state, action) => {
      state.tokenStatus = 'loading'
    },
    [fetchToken.fulfilled]: (state, action) => {
      state.tokenStatus = 'succeeded'
      state.isLoggedIn = true
      const { access_token } = action.payload
      unsplash.auth.setBearerToken(access_token)
      Cookies.set('token', access_token, { expires: 365 })
    },
    [fetchToken.rejected]: (state, action) => {
      state.tokenStatus = 'failed'
      state.tokenError = action.error.message
    }
  }
})

export const { logOut, logIn } = tokenSlice.actions

export default tokenSlice.reducer
