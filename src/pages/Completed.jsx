import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllTests } from '../data/tests';
import '../styles/Completed.css';

// Компонент сторінки з пройденими тестами
export default function Completed() {
  // Стани для поточного користувача та пройдених тестів
  const [currentUser, setCurrentUser] = useState(null);
  const [completedTests, setCompletedTests] = useState([]);
  const navigate = useNavigate();

  // Завантаження даних користувача та результатів тестів
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/auth');
      return;
    }
    setCurrentUser(user);

    try {
      const allTests = getAllTests();
      console.log('Completed: Завантажено всі тести:', allTests.length, allTests);
      const completed = [];
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('test_') && key.endsWith('_results')) {
          const testId = parseInt(key.match(/test_(\d+)_results/)[1]);
          try {
            const results = JSON.parse(localStorage.getItem(key) || '[]');
            const userResults = results.filter((result) => result.name === user.email);
            const test = allTests.find((t) => t.id === testId);
            if (test && userResults.length > 0) {
              userResults.forEach((result) => {
                completed.push({
                  testId,
                  title: test.title,
                  category: test.category,
                  score: result.score,
                  total: result.total,
                  percentage: ((result.score / result.total) * 100).toFixed(2),
                });
              });
            }
          } catch (error) {
            console.error(`Completed: Помилка парсингу результатів для ${key}:`, error);
          }
        }
      });
      console.log('Completed: Відфільтровано пройдені тести:', completed);
      setCompletedTests(completed);
    } catch (error) {
      console.error('Completed: Помилка завантаження тестів:', error);
      setCompletedTests([]);
    }
  }, [navigate]);

  // Умовний рендеринг для редіректу
  if (!currentUser) {
    return null;
  }

  // Рендеринг списку пройдених тестів
  return (
    <>
      <Header />
      <div className="completed-container">
        <h2>Пройдені тести</h2>
        <div className="completed-list">
          {completedTests.length > 0 ? (
            completedTests.map((test, index) => (
              <div key={`${test.testId}-${index}`} className="completed-item">
                <p>
                  <strong>{test.title}</strong> ({test.category})
                </p>
                <p>
                  Результат: {test.score}/{test.total} ({test.percentage}%)
                </p>
                <a href={`/test/${test.testId}`} className="retake-link" style={{color: "white"}}>
                  Пройти ще раз
                </a>
              </div>
            ))
          ) : (
            <p>Ви ще не проходили тести</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}