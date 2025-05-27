// EditProfilePage.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../store/user';
import { toast } from 'react-toastify';

const EditProfilePage = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        avatar: null as File | null,
        currentAvatar: ''
    });
    //const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:8000/api/profile/', {
    //                 headers: {
    //                     Authorization: `Bearer ${userStore.accessToken}`,
    //                 },
    //             });
    //             setFormData({
    //                 full_name: response.data.full_name || '',
    //                 avatar: null,
    //                 currentAvatar: response.data.avatar || ''
    //             });
    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Ошибка загрузки профиля', error);
    //             navigate('/profile');
    //         }
    //     };

    //     fetchProfile();
    // }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({ ...formData, avatar: file });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const data = new FormData();
        if (formData.full_name) data.append('full_name', formData.full_name);
        if (formData.avatar) data.append('avatar', formData.avatar);

        try {
            await axios.patch('http://localhost:8000/api/profile/', data, {
                headers: {
                    Authorization: `Bearer ${userStore.accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Профиль успешно обновлен');
            navigate('/profile');
        } catch (error) {
            console.error('Ошибка обновления профиля', error);
            toast.error('Ошибка при обновлении профиля');
        }
    };

    // if (loading) {
    //     return <div className="text-center p-4">Загрузка...</div>;
    // }

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Редактировать профиль</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">ФИО</label>
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Аватар</label>
                    {formData.currentAvatar && (
                        <div className="mb-2">
                            <img 
                                src={`http://localhost:8000${formData.currentAvatar}`} 
                                alt="Текущий аватар" 
                                className="w-16 h-16 rounded-full object-cover"
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        name="avatar"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="mt-1 block w-full"
                    />
                </div>
                
                <div className="flex space-x-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Сохранить
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/profile')}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfilePage;