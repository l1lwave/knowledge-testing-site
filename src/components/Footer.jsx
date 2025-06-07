import { Link } from 'react-router-dom';
import '../styles/Footer.css';

// Компонент футера сторінки
export default function Footer() {
  // Рендеринг футера з навігацією, контактами та копірайтом
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Секція навігації */}
        <div className="footer-section">
          <h4>Навігація</h4>
          <ul>
            <li><Link to="/">Тести</Link></li>
            <li><Link to="/zno">ЗНО</Link></li>
            <li><Link to="/completed">Пройдені</Link></li>
            <li><Link to="/create-test">Додати тест</Link></li>
          </ul>
        </div>
        {/* Секція контактів */}
        <div className="footer-section">
          <h4>Контакти</h4>
          <p>Email: <a href="mailto:support@testhub.com">support@testhub.com</a></p>
        </div>
        {/* Секція копірайту */}
        <div className="footer-section">
          <p>© 2025 Test-Online. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}