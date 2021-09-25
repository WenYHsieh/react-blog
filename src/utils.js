const TOKEN_NAME = 'jwtToken'

export const setAuthToken = (token) => {
  return localStorage.setItem(TOKEN_NAME, token)
}

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME)
}
