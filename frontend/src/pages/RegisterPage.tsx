import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [error, setError] = useState("")
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
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
        <input name="username" placeholder="Имя пользователя" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Пароль" onChange={handleChange} required />
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
