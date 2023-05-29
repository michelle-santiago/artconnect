import axios from "axios";
const url = "http://localhost:3000/api/v1"

export const signUp = async (data) => {
    return await axios.post(`${url}/sign_up`, data , {headers: {
      "Content-Type": "multipart/form-data"}
    })
}
export const signIn = async (data) => {
  return await axios.post(`${url}/sign_in`, data)
}

export const getArtists = async (token) => {
  return await axios.get(`${url}/artists`, { headers: token })
}

export const getArtist = async (token, id) => {
  return await axios.get(`${url}/artists/${id}`, { headers: token })
}

export const getArtistCommissions = async (token, id) => {
  return await axios.get(`${url}/commissions/${id}`, { headers: token })
}

export const createCommission = async (headers, data) => {
  return await axios.post(`${url}/commissions`, data , {headers: headers})
}