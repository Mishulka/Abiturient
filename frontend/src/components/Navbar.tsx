// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('access')
    window.location.href = '/login';
  }
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/">Главная</Link> |{" "}
      <Link to="/submitApplication">Подать заявку</Link> |{" "}
      <Link to="/profile">Профиль</Link> |{" "}
      <Link onClick={handleLogout} to="/logout">Выход</Link>
    </nav>
  );
};

export default Navbar;
