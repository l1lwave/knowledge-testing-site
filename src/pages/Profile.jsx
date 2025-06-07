import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTests } from '../data/tests';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';

// Компонент сторінки профілю користувача
export default function Profile() {
  // Стани для користувача, тестів та статистики
  const [currentUser, setCurrentUser] = useState(null);
  const [showStats, setShowStats] = useState({});
  const [userTests, setUserTests] = useState([]);
  const navigate = useNavigate();

  // Завантаження даних користувача та його тестів
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/auth');
      return;
    }
    setCurrentUser(user);

    try {
      const allTests = getAllTests();
      console.log('Profile: Завантажено всі тести:', allTests.length, allTests);
      const filteredTests = allTests.filter((test) => test.author === user.email);
      console.log('Profile: Відфільтровано тести користувача:', filteredTests);
      setUserTests(filteredTests);
    } catch (error) {
      console.error('Profile: Помилка завантаження тестів:', error);
      setUserTests([]);
    }
  }, [navigate]);

  // Обробка виходу з акаунта
  const handleLogout = () => {
    console.log('Profile: Вихід користувача:', currentUser.email);
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
  };

  // Перемикання відображення статистики
  const toggleStats = (testId) => {
    console.log('Profile: Перемикання статистики для тесту:', testId);
    setShowStats((prev) => ({ ...prev, [testId]: !prev[testId] }));
  };

  // Отримання статистики тесту
  const getTestStats = (testId) => {
    try {
      const stats = JSON.parse(localStorage.getItem(`test_${testId}_results`) || '[]');
      console.log('Profile: Статистика для тесту', testId, ':', stats);
      return stats;
    } catch (error) {
      console.error('Profile: Помилка парсингу статистики для тесту', testId, ':', error);
      return [];
    }
  };

  // Видалення тесту
  const handleDeleteTest = (testId) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цей тест?')) {
      return;
    }
    try {
      let customTests = JSON.parse(localStorage.getItem('custom_tests') || '[]');
      if (!Array.isArray(customTests)) {
        console.warn('Profile: custom_tests не є масивом, скидаємо до []');
        customTests = [];
      }
      const updatedCustomTests = customTests.filter((test) => test.id !== testId);
      localStorage.setItem('custom_tests', JSON.stringify(updatedCustomTests));
      console.log('Profile: Тест видалено:', testId);
      const updatedUserTests = userTests.filter((test) => test.id !== testId);
      setUserTests(updatedUserTests);
      // Видаляємо результати тесту
      localStorage.removeItem(`test_${testId}_results`);
      console.log('Profile: Результати тесту видалено:', `test_${testId}_results`);
    } catch (error) {
      console.error('Profile: Помилка видалення тесту:', error);
      alert('Помилка при видаленні тесту. Перевірте консоль.');
    }
  };

  // Умовний рендеринг для редіректу
  if (!currentUser) {
    return null;
  }

  // Рендеринг профілю та тестів користувача
  return (
    <>
      <Header />
      <div className="profile-container">
        <h2>Профіль користувача</h2>
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <svg
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
            </div>
            <div className="profile-info">
              <p><strong>Ім’я:</strong> {currentUser.name}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Вийти
          </button>
        </div>
        <div className="user-tests">
          <h3>Ваші тести</h3>
          {userTests.length > 0 ? (
            userTests.map((test) => (
              <div key={test.id} className="test-item">
                <p>
                  <strong>{test.title}</strong> ({test.category})
                </p>
                <div className="test-actions">
                  <button
                    className="stats-btn"
                    onClick={() => toggleStats(test.id)}
                  >
                    {showStats[test.id] ? 'Приховати статистику' : 'Переглянути статистику'}
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteTest(test.id)}
                  >
                    Видалити
                  </button>
                </div>
                {showStats[test.id] && (
                  <div className="test-stats">
                    <h4>Статистика всіх учасників</h4>
                    {getTestStats(test.id).length > 0 ? (
                      <ul>
                        {getTestStats(test.id).map((result, index) => (
                          <li key={index}>
                            {result.name}: {result.score}/{result.total}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Ще ніхто не проходив цей тест</p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>Ви ще не створили жодного тесту</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}