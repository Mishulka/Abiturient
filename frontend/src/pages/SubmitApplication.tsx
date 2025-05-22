import { useState } from "react";
import axios from "axios";
import { userStore } from "../store/user"

export default function SubmitApplication() {
    const [fullName, setFullName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [egeScore, setEgeScore] = useState("");
    const [passport, setPassport] = useState<File | null>(null);

    const handleSubmit = async () => {
        event?.preventDefault();
        const formData = new FormData();
        formData.append("full_name", fullName);
        formData.append("birth_date", birthDate);
        formData.append("ege_score", egeScore);
        if (passport) {
            formData.append("passport_scan", passport);

            const token = userStore.accessToken
            try {
                const res = await axios.post("http://127.0.0.1:8000/api/applications/", formData, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                    }
                })
                console.log("Создана заявка:", res.data)
                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        console.log("❌ Ошибка от API:", err.response?.data)
                    }else {
                    console.log("❌ Ошибка:", err)
                }
            }

        }
    }


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Подать заявку</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Имя</label>
                    <input 
                        type="text" 
                        id="name" 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="date" 
                        id="date" 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="egeScore" className="block text-sm font-medium text-gray-700">Баллы ЕГЭ</label>
                    <input 
                        type="text" 
                        id="egeScore" 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                        value={egeScore}
                        onChange={(e) => setEgeScore(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="passport" className="block text-sm font-medium text-gray-700">Паспорт</label>
                    <input 
                    onChange={e => 
                        setPassport(e.target.files?.[0] || null)
                    } 
                    type="file" 
                    className="mr-2" />
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >Отправить</button>
            </form>
        </div>
    )
}