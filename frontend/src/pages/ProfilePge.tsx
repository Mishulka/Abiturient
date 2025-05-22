import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { userStore } from "../store/user"
import axios from "axios"

type Application = {
  id: number
  full_name: string
  birth_date: string
  ege_score: number
  passport_scan: string
  status: string
  created_at: string
}


const ProfilePage = observer(() => {
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        console.log("Токен:", userStore.accessToken);
        const res = await axios.get("http://localhost:8000/api/getapp/", {
          headers: {
            Authorization: `Bearer ${userStore.accessToken?.trim()}`,
          },
        })
        setApplications(res.data)
        console.log(res.data)
      } catch (error) {
        console.error("Ошибка при получении заявок", error)
      }
    }

    if (userStore.accessToken) {
      fetchApplications()
    }
  }, [userStore.accessToken])

  // if (!userStore.userInfo) return <div>Загрузка...</div>

  return (
    <div>
          <h2>Ваши заявки</h2>
    {applications.length === 0 ? (
      <p>У вас пока нет заявок.</p>
    ) : (
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            <p><strong>ФИО:</strong> {app.full_name}</p>
            <p><strong>Дата рождения:</strong> {new Date(app.birth_date).toLocaleDateString()}</p>
            <p><strong>Баллы ЕГЭ:</strong> {app.ege_score}</p>
            <p><strong>Статус:</strong> {app.status}</p>
            <p>
              📎 <a href={`http://localhost:8000${app.passport_scan}`} target="_blank" rel="noopener noreferrer">
                Паспорт
              </a>
            </p>
            <hr />
          </li>
        ))}
      </ul>
    )}

    </div>
  )
})

export default ProfilePage
