import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '',
    full_name: '',
    avatar: null as File | null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, avatar: file });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/register/', formData,
        {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const loginRes = await axios.post('http://127.0.1:8000/api/login/', {
        username: formData.username,
        password: formData.password,
      });
      await axios.post('http://127.0.0.1:8000/api/register/', formData);
      setError("")
      navigate('/login');
    } catch (err) {
        console.error(err)
      setError("Неверное имя или пароль")
    }
  };

  return (
    <div className="container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
         <div>
                    <label className="block text-sm font-medium text-gray-700">Имя пользователя</label>
                    <input 
                        name="username" 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Пароль</label>
                    <input 
                        type="password" 
                        name="password" 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">ФИО</label>
                    <input 
                        name="full_name" 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Аватар</label>
                    <input 
                        type="file" 
                        name="avatar" 
                        className="mt-1 block w-full" 
                        onChange={handleFileChange} 
                        accept="image/*"
                    />
                </div>
        
        {error && (
        <p className="text-red-500 text-sm">{error}</p>
        )}
        <button type="submit">Зарегистрироваться</button>
        <a href="/login">Есть аккаунт? Войти</a>
      </form>
    </div>
  );
};

export default RegisterPage;
