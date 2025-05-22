// src/store/user.ts
import { makeAutoObservable } from "mobx"

type UserInfo = {
  id: number
  username: string
  email?: string
  // добавь сюда любые другие поля
}


class UserStore {
  accessToken: string | null = localStorage.getItem("access") || null
  userInfo: UserInfo | null = null
  
  constructor() {
    makeAutoObservable(this)
  }

  setAccessToken(token: string) {
    this.accessToken = token
    localStorage.setItem("access", token)
  }

  setUserInfo(info: UserInfo) {
    this.userInfo = info
  }

  logout() {
    this.accessToken = null
    localStorage.removeItem("access")
  }

  get isLoggedIn() {
    return !!this.accessToken
  }

  async fetchUserInfo() {
    if (!this.accessToken) return null
    try {
      const res = await fetch("http://localhost:8000/api/me", {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      })
      if (!res.ok) throw new Error("Token check Error")
      const data = await res.json()
      return data
    }catch (e) {
      this.logout()
      return null
    }
  }
}

export const userStore = new UserStore()
