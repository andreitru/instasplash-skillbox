import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { unsplash } from './unsplashApi'
import fetch from 'node-fetch'
global.fetch = fetch;

const initialState = {
  tokenStatus: 'idle',
  tokenError: null
}

export const fetchToken = createAsyncThunk('token/fetchToken', async (code) => {
  const response = await unsplash.auth.userAuthentication(code).then(res => res.json()).then(json => json)
  return response
})

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchToken.fulfilled]: (state, action) => {
      state.tokenStatus = 'succeeded'
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

export default tokenSlice.reducer
