import { useState } from "react"
import { login, getMe } from "../api/auth"
import { useNavigate } from "react-router-dom"
import { userStore } from "../store/user"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    const res = await login({ username, password })
    const token = res.data.access
    // вместо localStorage.setItem
    userStore.setAccessToken(token)

    const me = await getMe(token)
    userStore.setUserInfo(me.data)
    console.log("Вы вошли как:", me.data)

    navigate("/submitApplication")
  }

  

  return (
    <form className="p-4" onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mr-2"
      />
      <button className="bg-blue-500 text-white px-4 py-2">
        Войти
      </button>
    </form>
  )
}
