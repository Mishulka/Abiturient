import axios from "axios"
import { useEffect, useState } from "react"
import { DragAndDropList } from "../components/DnDList/DnDlist"

type Institution = {
  id: number
  name: string
  address?: string
  email?: string
  phone?: string
}

export default function Home() {
  const [institutions, setInstitutions] = useState<Institution[]>([])

  useEffect(() => {
    axios.get("http://localhost:8000/api/institutions/")
      .then(res => setInstitutions(res.data))
      .catch(err => console.error("Ошибка загрузки учреждений:", err))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Учебные учреждения</h1>
      {/* <p>dnd</p>
        
      <div style={{ border: "1px solid red", padding: "20px" }}>
        <DragAndDropList />
      </div> */} 
      <div className="space-y-4">
        {institutions.map((inst) => (
          <div
            key={inst.id}
            className="border rounded-lg shadow p-4 bg-white"
          >
            <h2 className="text-lg font-semibold">{inst.name}</h2>
            {inst.address && <p className="text-sm text-gray-600">📍 Адрес: {inst.address}</p>}
            {inst.email && <p className="text-sm text-gray-600">📧 Email: {inst.email}</p>}
            {inst.phone && <p className="text-sm text-gray-600">📞 Телефон: {inst.phone}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
