import Unsplash from 'unsplash-js';
import Cookies from 'js-cookie'
import fetch from 'node-fetch';
global.fetch = fetch;

export const unsplash = new Unsplash({
  accessKey: ***REMOVED***,
  secret: ***REMOVED***,
  callbackUrl: "http://localhost:3000/auth",
  bearerToken: Cookies.get('token')
});

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "write_likes"
]);
  
if (Cookies.get('token') === undefined) {
  window.location.assign(authenticationUrl);
}

// Cookies.remove('token')