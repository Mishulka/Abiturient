import axios from "axios"

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
})

export const register = (data: { username: string, password: string }) =>
  API.post("auth/users/", data)

export const login = (data: { username: string, password: string }) =>
  API.post("auth/jwt/create/", data)

export const getMe = (token: string) =>
  API.get("auth/users/me/", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
