import { configureStore } from '@reduxjs/toolkit';
import photosReducer from '../features/photos/photosSlice'
import tokenReducer from '../api/tokenSlice'
import singlePhotoReducer from '../features/photos/singlePhotoSlice'

export default configureStore({
  reducer: {
    photos: photosReducer,
    singlePhoto: singlePhotoReducer,
    token: tokenReducer
  },
});
