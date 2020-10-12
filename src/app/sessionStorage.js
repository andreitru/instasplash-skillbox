export const persistedPhotos = sessionStorage.getItem('store') ?
  JSON.parse(sessionStorage.getItem('store')).photos.photos : [];
  
export const persistedPage = sessionStorage.getItem('store') ?
  JSON.parse(sessionStorage.getItem('store')).photos.page : 1;