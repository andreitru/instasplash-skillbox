import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toJson } from 'unsplash-js';
import { unsplash } from '../../api/unsplashApi'
import fetch from 'node-fetch';
global.fetch = fetch;

const initialState = {
  photos: [],
  status: 'idle',
  error: null,
  page: 1
}

export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async (page) => {
  const response = await unsplash.photos.listPhotos(page).then(toJson).then(json => json)
  return response
})

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    likedPhoto(state, action) {
      const photoId = action.payload.photoId
      const existingPhoto = state.photos.find(photo => photo.id === photoId)
      existingPhoto.likes = action.payload.likes
    }
  },
  extraReducers: {
    [fetchPhotos.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPhotos.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.page++
      state.photos = state.photos.concat(action.payload)
    },
    [fetchPhotos.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const { likedPhoto } = photosSlice.actions

export default photosSlice.reducer

export const selectAllPhotos = state => state.photos.photos
export const selectPhotoById = (state, photoId) => state.photos.photos.find(photo => photo.id === photoId)