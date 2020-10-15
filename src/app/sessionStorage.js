import Cookies from 'js-cookie'

export const persistedPhotos = sessionStorage.getItem('store') ?
  JSON.parse(sessionStorage.getItem('store')).photos.photos : [];
  
export const persistedPage = sessionStorage.getItem('store') ?
  JSON.parse(sessionStorage.getItem('store')).photos.page : 1;

export const currentPage = sessionStorage.getItem('store') ?
  JSON.parse(sessionStorage.getItem('store')).token.currentPage : '/';


export const isLoggedIn = Cookies.get('token') === undefined ? false : true