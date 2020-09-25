import { configureStore } from '@reduxjs/toolkit';
import photosReducer from '../features/photos/photosSlice'
import tokenReducer from '../api/tokenSlice'

export default configureStore({
  reducer: {
    photos: photosReducer,
    token: tokenReducer
  },
});
