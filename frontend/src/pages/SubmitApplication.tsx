import { useEffect, useState } from "react";
import axios from "axios";
import { userStore } from "../store/user"
import { useNavigate } from "react-router-dom"

export default function SubmitApplication() {
    const [fullName, setFullName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [egeScore, setEgeScore] = useState("");
    const [institution, setInstitutions] = useState<string>("");
    const [inst, setInst] = useState<{ id: number; name: string }[]>([]);
    const [passport, setPassport] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setPassport(file);
    };

    useEffect(() => {
    axios.get("http://localhost:8000/api/institutions/")
        .then(res => setInst(res.data))
    }, []);
    const navigate = useNavigate()

    const handleSubmit = async () => {
        event?.preventDefault();
        const formData = new FormData();
        formData.append("full_name", fullName);
        formData.append("birth_date", birthDate);
        formData.append("ege_score", egeScore);
        formData.append("institution_id", institution);

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
                navigate("/profile") 
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
                <div className="mb-2">
                    <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Учреждение</label>
                    <select
                        id="institution"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={institution}
                        onChange={(e) => setInstitutions(e.target.value)}
                    >
                        <option value="">Выберите учреждение</option>
                        {inst.map(inst => (
                        <option key={inst.id} value={inst.id}>
                            {inst.name}
                        </option>
                        ))}
                    </select>
                    </div>

                <div className="mb-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Имя</label>
                    <input 
                        type="text" 
                        id="name" 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        />
                </div>
                <div className="mb-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Дата рождения</label>
                    <input 
                        type="date" 
                        id="date" 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>
                <div className="mb-2">
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
                    <label htmlFor="passport" className="block text-sm font-medium text-gray-700 mb-2">
                        Паспорт
                    </label>

                    <label
                        htmlFor="passport"
                        className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-blue-800 bg-blue-50 text-blue-800 rounded-lg cursor-pointer hover:bg-blue-100 transition text-center px-4"
                    >
                        {passport ? (
                        <span className="text-sm font-medium">{passport.name}</span>
                        ) : (
                        <span className="text-sm">Выберите файл</span>
                        )}

                        <input
                        id="passport"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        />
                    </label>
                    </div>

                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >Отправить</button>
            </form>
        </div>
    )
}