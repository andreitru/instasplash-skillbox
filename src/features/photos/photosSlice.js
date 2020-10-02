import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toJson } from 'unsplash-js';
import { unsplash } from '../../api/unsplashApi'
import fetch from 'node-fetch';
global.fetch = fetch;

const initialState = {
  photos: [],
  isFullSize: false,
  status: 'idle',
  error: null,
  page: 1,
  fetchPhotoStatus: 'idle',
  fetchPhotoError: null,
  likeStatus: 'idle',
  likeError: null
}

export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async (page) => {
  const response = await unsplash.photos.listPhotos(page).then(toJson).then(json => json)
  return response
})

export const fetchSinglePhoto = createAsyncThunk('photos/getPhoto', async (id) => {
  const response = await unsplash.photos.getPhoto(id).then(toJson).then(json => json)
  return response  
})

export const fetchLikePhoto = createAsyncThunk('photos/likePhoto', async (id) => {
  const response = await unsplash.photos.likePhoto(id).then(toJson).then(json => json)
  return response
})

export const fetchUnlikePhoto = createAsyncThunk('photos/unlikePhoto', async (id) => {
  const response = await unsplash.photos.unlikePhoto(id).then(toJson).then(json => json)
  return response
})

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    getPhotoLikes(state, action) {
      const id = action.payload.id
      const existingPhoto = state.photos.find(photo => photo.id === id)
      existingPhoto.likes = action.payload.likes
    },
    getFullSize(state, action) {
      state.isFullSize = !state.isFullSize;
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
    },
    [fetchSinglePhoto.pending]: (state, action) => {
      state.fetchPhotoStatus = 'loading'
      if (state.isFullSize === true) {
        state.isFullSize = !state.isFullSize;
      }
    },
    [fetchSinglePhoto.fulfilled]: (state, action) => {
      state.fetchPhotoStatus = 'succeeded'
      const { likes, liked_by_user, id } = action.payload
      const existingPhoto = state.photos.find(photo => photo.id === id)
      existingPhoto.likes = likes
      existingPhoto.liked_by_user = liked_by_user
    },
    [fetchSinglePhoto.rejected]: (state, action) => {
      state.fetchPhotoStatus = 'failed'
      state.fetchPhotoError = action.error.message
    },
    [fetchLikePhoto.pending]: (state, action) => {
      state.likeStatus = 'loading'
    },
    [fetchLikePhoto.fulfilled]: (state, action) => {
      state.likeStatus = 'succeeded'
      const { likes, liked_by_user, id } = action.payload.photo
      const existingPhoto = state.photos.find(photo => photo.id === id)
      existingPhoto.likes = likes
      existingPhoto.liked_by_user = liked_by_user
    },
    [fetchLikePhoto.rejected]: (state, action) => {
      state.likeStatus = 'failed'
      state.likeError = action.error.message
    },
    [fetchUnlikePhoto.pending]: (state, action) => {
      state.likeStatus = 'loading'
    },
    [fetchUnlikePhoto.fulfilled]: (state, action) => {
      state.likeStatus = 'succeeded'
      const { likes, liked_by_user, id } = action.payload.photo
      const existingPhoto = state.photos.find(photo => photo.id === id)
      existingPhoto.likes = likes
      existingPhoto.liked_by_user = liked_by_user
    },
    [fetchUnlikePhoto.rejected]: (state, action) => {
      state.likeStatus = 'failed'
      state.likeError = action.error.message
    }
  }
})

export const { getPhotoLikes, getFullSize } = photosSlice.actions

export default photosSlice.reducer

export const selectAllPhotos = state => state.photos.photos
export const selectPhotoById = (state, photoId) => state.photos.photos.find(photo => photo.id === photoId)