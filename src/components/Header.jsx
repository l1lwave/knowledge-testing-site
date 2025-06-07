import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/Header.css';

// Компонент заголовка сторінки
export default function Header() {
  // Стан для поточного користувача
  const [currentUser, setCurrentUser] = useState(null);
  // Стан для мобільного меню
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Завантаження даних користувача
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  }, []);

  // Перемикання мобільного меню
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Рендеринг заголовка
  return (
    <header className="header">
      <div className="left">
        {/* Логотип */}
        <div className="logo">
          <Link to="/">Test-Online</Link>
        </div>
        {/* Навігація для десктопу */}
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`} style={{backgroundColor: "#1e1e1e"}}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Тести</Link>
          <Link to="/zno" onClick={() => setIsMenuOpen(false)}>ЗНО</Link>
          <Link to="/completed" onClick={() => setIsMenuOpen(false)}>Пройдені</Link>
          <Link to="/create-test" onClick={() => setIsMenuOpen(false)}>Додати тест</Link>
        </nav>
      </div>
      {/* Права частина з авторизацією */}
      <div className="right">
        {currentUser ? (
          <div className="user-info">
            <Link to="/profile" className="profile-btn" onClick={() => setIsMenuOpen(false)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#808080"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="avatar-icon"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                <path d="M4.22 18.78C5.29 16.67 7.53 15 10 15h4c2.47 0 4.71 1.67 5.78 3.78" />
              </svg>
              <span>{currentUser.name}</span>
            </Link>
          </div>
        ) : (
          <Link to="/auth" className="auth-link" onClick={() => setIsMenuOpen(false)}>
            Увійти/Зареєструватися
          </Link>
        )}
      </div>
      {/* Кнопка гамбургер-меню для мобільних */}
      <button className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}