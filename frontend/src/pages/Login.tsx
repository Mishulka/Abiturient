import { useState } from "react"
import { login, getMe } from "../api/auth"
import { useNavigate } from "react-router-dom"
import { userStore } from "../store/user"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("") 
  const navigate = useNavigate()

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const res = await login({ username, password })
      const token = res.data.access

      userStore.setAccessToken(token)
      const me = await getMe(token)
      userStore.setUserInfo(me.data)
      console.log("Вы вошли как:", me.data)

      setError("") // сброс ошибки при успехе
      navigate("/submitApplication")
    } catch (err) {
      setError("Неверное имя пользователя или пароль")
      console.error(err)
    }
  }

  return (
    <form className="p-4 space-y-4 max-w-sm mx-auto" onSubmit={handleLogin}>
      <h2 className="text-xl font-semibold mb-2">Вход</h2>

      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
      />

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 w-full"
      >
        Войти
      </button>

      <div className="text-center">
        <a href="/register" className="text-blue-500 hover:underline">Нет аккаунта? Зарегистрируйтесь</a>
      </div>
    </form>
  )
}
