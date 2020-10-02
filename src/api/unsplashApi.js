import Unsplash from 'unsplash-js';
import { ACCESS_KEY, SECRET, CALLBACK_URL } from './keys'
import Cookies from 'js-cookie'
import fetch from 'node-fetch';
global.fetch = fetch;

export const utmSource = '?utm_source=instasplash&utm_medium=referral'

export const unsplash = new Unsplash({
  accessKey: ACCESS_KEY,
  secret: SECRET,
  callbackUrl: CALLBACK_URL,
  bearerToken: Cookies.get('token')
});

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "write_likes"
]);
  
if (Cookies.get('token') === undefined) {
  window.location.assign(authenticationUrl);
}