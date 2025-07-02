import { getSession } from "@/utils/auth/getSession"
import { logout } from "@/utils/auth/logout"
import axios from "axios"

// const baseURL = "https://aqsa.com/api"
const baseURL = ""


// Create an Axios instance for guest/public requests
const AqsaGuestAPI = axios.create({
  baseURL: baseURL,
  timeout: 15000, // 15 second timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Handle guest API response errors (no auth required)
AqsaGuestAPI.interceptors.response.use(
  response => {
    // handel success response
    return response
  },
  error => {
    if (!error.response) {// if no response, return error
      return Promise.reject({
        status: 500,
        error: 'حدث خطأ في الشبكة'
      })
    }

    // For guest API, we don't logout on 401, just return the error
    return Promise.reject(error)
  }
)


// Create an Axios instance
const AqsaAPI = axios.create({
  baseURL: baseURL,
  timeout: 15000, // 15 second timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Add auth token to requests
AqsaAPI.interceptors.request.use(async (config) => {
  const session = getSession() // get session from local storage
  if (!session?.token) { // if no token, return error
    return Promise.reject({
      status: 401,
      error: 'يرجى تسجيل الدخول للمتابعة'
    })
  }
  config.headers["Authorization"] = `Bearer ${session.token}` // add token to headers
  return config
})

// Handle response errors
AqsaAPI.interceptors.response.use(
  response => {
    // handel success response
    return response
  },
  error => {
    if (!error.response) {// if no response, return error
      return Promise.reject({
        status: 500,
        error: 'حدث خطأ في الشبكة'
      })
    }

    if (error.response.status === 401) { // if 401, logout
      logout()
    }

    return Promise.reject(error)
  }
)

// export default AqsaAPI
export { AqsaGuestAPI, AqsaAPI }