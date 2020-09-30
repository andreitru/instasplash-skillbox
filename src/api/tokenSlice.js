import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { unsplash } from './unsplashApi'
import fetch from 'node-fetch'
global.fetch = fetch;

const initialState = {
  tokenStatus: 'idle',
  tokenError: null
}

const code = window.location.search.split('code=')[1];

export const fetchToken = createAsyncThunk('token/fetchToken', async () => {
  unsplash.auth.userAuthentication(code)
  .then(res => res.json())
  .then(json => {
    unsplash.auth.setBearerToken(json.access_token);
    Cookies.set('token', json.access_token, { expires: 365 })})
})

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchToken.fulfilled]: (state, action) => {
      state.tokenStatus = 'succeeded'
    },
    [fetchToken.rejected]: (state, action) => {
      state.tokenStatus = 'failed'
      state.tokenError = action.error.message
    }
  }
})

export default tokenSlice.reducer
