export const createConsumer = async (getWebSocketURL) => {
  const token = localStorage.get('auth-token')
  return `${getWebSocketURL}?token=${token}`
}
