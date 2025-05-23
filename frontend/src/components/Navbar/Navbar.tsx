import { Link, useLocation } from 'react-router-dom';
import './style.css';

const Navbar = () => {
  const location = useLocation();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('access');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">🎓 Абитуриент</div>
        <div className="navbar-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Главная</Link>
          <Link to="/submitApplication" className={location.pathname === '/submitApplication' ? 'active' : ''}>Подать заявку</Link>
          <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Профиль</Link>
          <a href="/logout" onClick={handleLogout}>Выход</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
