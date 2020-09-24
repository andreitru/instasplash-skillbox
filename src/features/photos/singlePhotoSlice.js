import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toJson } from 'unsplash-js'
import { unsplash } from '../../api/unsplashApi'
import fetch from 'node-fetch'
global.fetch = fetch

const initialState = {
  id: '',
  likes: 0,
  status: 'idle',
  error: null,
  isLiked: false,
  fetchPhotoStatus: 'idle'
}

export const fetchLikePhoto = createAsyncThunk('photos/likePhoto', async (id) => {
  const response = await unsplash.photos.likePhoto(id).then(toJson).then(json => json)
  return response
})

export const fetchUnlikePhoto = createAsyncThunk('photos/unlikePhoto', async (id) => {
  const response = await unsplash.photos.unlikePhoto(id).then(toJson).then(json => json)
  return response
})

export const fetchSinglePhoto = createAsyncThunk('photos/getPhoto', async (id) => {
  const response = await unsplash.photos.getPhoto(id).then(toJson).then(json => json)
  return response  
})

export const singlePhotoSlice = createSlice({
  name: 'singlePhoto',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSinglePhoto.pending]: (state, action) => {
      state.fetchPhotoStatus = 'loading'
    },
    [fetchSinglePhoto.fulfilled]: (state, action) => {
      const { id, likes, liked_by_user } = action.payload
      state.fetchPhotoStatus = 'succeeded'
      state.id = id
      state.likes = likes
      state.isLiked = liked_by_user
    },
    [fetchSinglePhoto.rejected]: (state, action) => {
      state.fetchPhotoStatus = 'failed'
      state.error = action.error.message
    },
    [fetchLikePhoto.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchLikePhoto.fulfilled]: (state, action) => {
      const { likes, liked_by_user } = action.payload.photo
      state.status = 'succeeded'
      state.likes = likes
      state.isLiked = liked_by_user
    },
    [fetchLikePhoto.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [fetchUnlikePhoto.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchUnlikePhoto.fulfilled]: (state, action) => {
      const { likes, liked_by_user } = action.payload.photo
      state.status = 'succeeded'
      state.likes = likes
      state.isLiked = liked_by_user
    },
    [fetchUnlikePhoto.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export default singlePhotoSlice.reducer