import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { userStore } from "../store/user"
import axios from "axios"
import { Link } from "react-router-dom"
import trashIcon from '../assets/trash.svg';


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
  

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/getapp/", {
        headers: {
          Authorization: `Bearer ${userStore.accessToken?.trim()}`,
        },
      })
      setApplications(res.data)
    } catch (error) {
      console.error("Ошибка при получении заявок", error)
    }
  }

  useEffect(() => {
    if (userStore.accessToken) {
      fetchApplications()
    }
  }, [userStore.accessToken])

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Вы уверены, что хотите удалить заявку?")
    if (!confirm) return

    try {
      await axios.delete(`http://localhost:8000/api/deleteapp/${id}/`, {
        headers: {
          Authorization: `Bearer ${userStore.accessToken?.trim()}`,
        },
      })
      setApplications((prev) => prev.filter((app) => app.id !== id))
    } catch (error) {
      console.error("Ошибка при удалении", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-600 rounded-4xl text-white";
      case "approved":
        return "bg-green-600 rounded-4xl text-white";
      case "rejected":
        return "bg-red-600 rounded-4xl text-white";
      default:
        return "text-gray-600";
    }
  };


  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">Ваши заявки</h2>
      <div className="max-w-4xl mx-auto p-4">
        {applications.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-2">У вас пока нет заявок.</p>
            <Link
              to="/submitApplication"
              className="text-white"
            >
              Подать заявку
            </Link>
          </div>
        ) : (
          <div className="gap-4 flex flex-sm-column flex-wrap">
            {applications.map((app) => (
              <div
                key={app.id}
                className="border rounded-lg p-4 shadow-sm bg-white flex gap-4 md:flex-row justify-between gap-4 min-w-80 "
              >
                <div className="text-left">
                <p><strong>ФИО:</strong> {app.full_name}</p>
                <p><strong>Дата рождения:</strong> {new Date(app.birth_date).toLocaleDateString()}</p>
                <p><strong>Баллы ЕГЭ:</strong> {app.ege_score}</p>
                <p>
                    📎 <a
                      href={`http://localhost:8000${app.passport_scan}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Паспорт
                    </a>
                  </p>
                </div>
                
                <div className="flex flex-col justify-between">
                  <div className={getStatusColor(app.status)}>
                  {" "}
                    <span >{app.status}</span>
                  </div>

                  <button
                    onClick={() => handleDelete(app.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    <img src={trashIcon} alt="удалить"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
    
  )
})

export default ProfilePage
