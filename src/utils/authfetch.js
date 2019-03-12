// @flow strict
import type { Data } from '../types';

export function getCookie(name: string) {
  const namedCookie = document.cookie
    .split('; ')
    .filter((cookie: string) => cookie.startsWith(name))
    .toString();
  const cookie = namedCookie.split('=')[1];

  return cookie;
}

export function authfetch(
  url: string,
  data: Data = {},
  method: string = 'GET'
) {
  const options: RequestOptions = {
    method,
    headers: new Headers({
      Authorization: `Token ${getCookie('authtoken')}`
    })
  };

  if (method.toUpperCase() !== 'GET') {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options).then(response => response.json());
}
