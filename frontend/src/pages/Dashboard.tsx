// src/pages/Dashboard.tsx

import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { userStore } from "../store/user"
import axios from "axios"
import { useNavigate } from "react-router-dom"

type Application = {
  id: number
  full_name: string
  birth_date: string
  score: number
  status: string
}

export default observer(function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!userStore.isLoggedIn) {
      navigate("/login")
    } else {
      axios.get("http://localhost:8000/api/applications/", {
        headers: {
          Authorization: `Bearer ${userStore.accessToken}`
        }
      }).then(res => {
        setApplications(res.data)
      })
    }
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Мои заявки</h1>
      <div className="space-y-2">
        {applications.map(app => (
          <div key={app.id} className="border p-4 rounded">
            <p><strong>ФИО:</strong> {app.full_name}</p>
            <p><strong>Дата рождения:</strong> {app.birth_date}</p>
            <p><strong>Баллы:</strong> {app.score}</p>
            <p><strong>Статус:</strong> {app.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
})
