import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { userStore } from "../store/user"
import axios from "axios"

type Application = {
  id: number
  date: string
  file_url: string
}

const ProfilePage = observer(() => {
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        console.log("Токен:", userStore.accessToken);
        const res = await axios.get("http://localhost:8000/api/applications/my/", {
          headers: {
            Authorization: `Bearer ${userStore.accessToken?.trim()}`,
          },
        })
        setApplications(res.data)
      } catch (error) {
        console.error("Ошибка при получении заявок", error)
      }
    }

    if (userStore.accessToken) {
      fetchApplications()
    }
  }, [userStore.accessToken])

  if (!userStore.userInfo) return <div>Загрузка...</div>

  return (
    <div>
      <h1>Профиль</h1>
      <p><strong>Пользователь:</strong> {userStore.userInfo.username}</p>

      <h2>Ваши заявки</h2>
      {applications.length === 0 ? (
        <p>У вас пока нет заявок.</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li key={app.id}>
              📄 <a href={app.file_url} target="_blank" rel="noopener noreferrer">Файл</a> – {new Date(app.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
})

export default ProfilePage
