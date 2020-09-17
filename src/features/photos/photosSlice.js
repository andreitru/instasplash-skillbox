import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'

import Unsplash, {
  toJson
} from 'unsplash-js';

const unsplash = new Unsplash({
  accessKey: ***REMOVED***
});

const initialState = {
  photos: [],
  status: 'idle',
  error: null
}

export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async () => {
  const response = await unsplash.photos.listPhotos().then(toJson).then(json => json)
  return response
})

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPhotos.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPhotos.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.photos = state.photos.concat(action.payload)
    },
    [fetchPhotos.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export default photosSlice.reducer

export const selectAllPhotos = state => state.photos.photos
export const selectPhotoById = (state, photoId) => state.photos.photos.find(photo => photo.id === photoId)