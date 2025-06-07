import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import '../styles/Auth.css';

// Компонент сторінки авторизації та реєстрації
export default function Auth() {
  // Стани для форми авторизації
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Обробка форми авторизації/реєстрації через email
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Auth: Подання форми:', { isLogin, email });

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!Array.isArray(users)) {
      console.warn('Auth: users не є масивом, скидаємо до []');
      users = [];
    }

    if (isLogin) {
      const user = users.find((u) => u.email === email && u.password === password);
      if (user) {
        console.log('Auth: Успішний вхід:', user);
        localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
        navigate('/profile');
      } else {
        console.error('Auth: Невірний email або пароль');
        alert('Невірний email або пароль');
      }
    } else {
      if (users.find((u) => u.email === email)) {
        console.error('Auth: Email уже зареєстровано');
        alert('Цей email уже зареєстровано');
        return;
      }
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify({ name, email }));
      console.log('Auth: Успішна реєстрація:', newUser);
      navigate('/profile');
    }
  };

  // Обробка входу через Google
  const handleGoogleSignIn = async () => {
    console.log('Auth: Спроба входу через Google');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Auth: Успішний вхід через Google:', user);

      let users = JSON.parse(localStorage.getItem('users') || '[]');
      if (!Array.isArray(users)) {
        console.warn('Auth: users не є масивом, скидаємо до []');
        users = [];
      }

      const existingUser = users.find((u) => u.email === user.email);
      if (!existingUser) {
        const newUser = { name: user.displayName || 'Користувач Google', email: user.email, password: '' };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Auth: Додано користувача Google до localStorage:', newUser);
      }

      localStorage.setItem('currentUser', JSON.stringify({ name: user.displayName || 'Користувач Google', email: user.email }));
      navigate('/profile');
    } catch (error) {
      console.error('Auth: Помилка входу через Google:', error);
      alert(`Помилка входу через Google: ${error.message}`);
    }
  };

  // Рендеринг форми авторизації
  return (
    <>
      <Header />
      <div className="auth-container">
        <h2>{isLogin ? 'Вхід' : 'Реєстрація'}</h2>
        <form onSubmit={handleEmailSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Ім’я:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введіть ім’я"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введіть email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введіть пароль"
              required
            />
          </div>
          <button type="submit">{isLogin ? 'Увійти' : 'Зареєструватися'}</button>
        </form>
        {/* Кнопка входу через Google */}
        <button className="google-signin-btn" onClick={handleGoogleSignIn}>
          Увійти через Google
        </button>
        {/* Перемикання між входом і реєстрацією */}
        <button className="toggle-auth-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Немає акаунта? Зареєструйтесь' : 'Вже є акаунт? Увійдіть'}
        </button>
      </div>
      <Footer />
    </>
  );
}