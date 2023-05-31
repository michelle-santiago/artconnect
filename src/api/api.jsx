import axios from "axios";
const url = "https://artconnect.onrender.com/api/v1"

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

export const updateCommission = async (headers, data) => {
  return await axios.patch(`${url}/commissions/${data.id}`, data , {headers: headers})
}

export const createRequest = async (headers, data) => {
  return await axios.post(`${url}/requests`, data , { headers: headers })
}

export const getRequests = async (token) => {
  return await axios.get(`${url}/requests`, { headers: token })
}

export const updateRequest = async (token, data) => {
  return await axios.patch(`${url}/requests/${data.request_id}?status=${data.status}`, data, { headers: token })
}

export const updatePayment = async (token, data) => {
  return await axios.patch(`${url}/requests/${data.request_id}/paid`, data, { headers: token })
}

export const cancelRequest = async (token,data) => {
  return await axios.patch(`${url}/requests/${data.request_id}/cancelled/edit`, data, { headers: token })
}

export const getCommissions = async (token) => {
  return await axios.get(`${url}/commissions/`, { headers: token })
}

export const updateCommissionStatus = async (token, data) => {
  return await axios.patch(`${url}/commissions/${data.commission_id}/complete_status`, data, { headers: token })
}

export const createCommissionProcess = async (headers, data) => {
  return await axios.patch(`${url}/commissions/${data.commission_id}/add_process`, data , {headers: headers})
}

export const updateCommissionProcess = async (headers, data) => {
  return await axios.patch(`${url}/commissions/${data.commission_id}/update_process`, data , {headers: headers})
}

export const updateProcessStatus = async (token, data) => {
  return await axios.patch(`${url}/commissions/${data.commission_id}/complete_process`, data, { headers: token })
}
