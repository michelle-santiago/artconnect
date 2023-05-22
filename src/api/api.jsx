import axios from 'axios';

export const signUp = async ({ first_name, last_name, email, username, password, password_confirmation, role }) => {
    return await axios.post('http://localhost:3000/api/v1/sign_up', { first_name, last_name, email, username, password, password_confirmation, role })
}
export const signIn = async ({ email, password }) => {
  return await axios.post('http://localhost:3000/api/v1/sign_in', {
       email, password 
  })
}