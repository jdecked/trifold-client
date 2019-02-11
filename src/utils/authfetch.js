// @flow strict
export function getCookie(name: string) {
  const namedCookie = document.cookie
    .split('; ')
    .filter((cookie: string) => cookie.startsWith(name));
  const cookie = namedCookie.split('=')[1];

  return cookie;
}

export function authfetch(url: string) {}
