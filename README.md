# 🎓 Абитуриент

> Личный проект, разработанный с использованием **React** + **Django (DRF)**.  
> Этот сайт демонстрирует основные функции портала подачи заявок для учебных учреждений.
> Сделал этот проект с целью создания полноценного сайта с полноценным CRUD, а не просто версткой.
---

## 🌐 Сайт в действии

👉 **[Перейти к сайту](https://kamidzugi.pythonanywhere.com/myApps)**

> ⚠️ *На данный момент регистрация временно отключена.*  
> Для входа используйте:  
> **Логин:** `2`  
> **Пароль:** `2`

---

## 🚀 Возможности

- 🔐 Авторизация по логину и паролю
- 📥 Подача заявок через интерфейс
- 👁️ Просмотр поданных заявок
- ❌ Удаление заявок
- 📌 Маршрутизация по страницам (React Router)
- 💾 Хранение состояния (MobX или Context API — в зависимости от реализации)
- ⚙️ Backend API на Django + Django REST Framework

---

## 🛠️ Технологии

### Frontend
- **React**  
- **React Router DOM**  
- **Axios**  
- **MobX** (или Context API)
- **CSS Modules / PostCSS**

### Backend
- **Django**
- **Django REST Framework**
- **SQLite** (или другая БД, если менял)
- **PythonAnywhere** (развёртывание)

---
Схема: Архитектура проекта
![image](https://github.com/user-attachments/assets/74cf41bb-3d5a-479b-8a7c-cef6f1b00f67)

---

## 📁 Структура проекта

```bash
/Frontend
  /src
    /components
    /pages
    /store
    App.tsx

/Backend
  /api
    models.py
    views.py
    serializers.py
  settings.py
