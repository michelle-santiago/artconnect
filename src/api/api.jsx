import axios from "axios";
const url = "http://localhost:3000/api/v1"

export const signUp = async ({ first_name, last_name, email, username, password, password_confirmation, role, avatar }) => {
    return await axios.post(`${url}/sign_up`, { first_name, last_name, email, username, password, password_confirmation, role, avatar }, {headers: {
      "Content-Type": "multipart/form-data"}
    })
}
export const signIn = async ({ email, password }) => {
  return await axios.post(`${url}/sign_in`, {
       email, password 
  })
}