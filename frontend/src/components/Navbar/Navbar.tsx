import { Link, useLocation } from 'react-router-dom';
import './style.css';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('access');
    window.location.href = '/login';
  };

  const toggleMenu = () => setMenuOpen(prev => !prev)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">🎓 Абитуриент</div>

        <button className="burger" onClick={toggleMenu}>
          ☰
        </button>
        
        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Главная</Link>
          <Link to="/submitApplication" className={location.pathname === '/submitApplication' ? 'active' : ''}>Подать заявку</Link>
          <Link to="/myApps" className={location.pathname === '/profile' ? 'active' : ''}>Ваши заявки</Link>
          <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Профиль</Link>
          <a href="/logout" onClick={handleLogout}>Выход</a>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
