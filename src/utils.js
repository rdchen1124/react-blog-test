const TOKEN_NAME = 'token';
export const setAuthToken = (token) => {
  window.localStorage.setItem(TOKEN_NAME, token);
}
export const getAuthToken = () => {
  return window.localStorage.getItem(TOKEN_NAME);
}