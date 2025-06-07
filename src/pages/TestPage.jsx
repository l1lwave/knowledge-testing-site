import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllTests } from '../data/tests';
import '../styles/TestPage.css';

// Компонент сторінки проходження тесту
export default function TestPage() {
  // Отримання ID тесту з URL
  const { testId } = useParams();
  const navigate = useNavigate();

  // Стани для тесту, користувача, відповідей та стану тесту
  const [test, setTest] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);

  // Завантаження тесту та даних користувача
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
    if (user) {
      setUserName(user.name);
    }

    try {
      const allTests = getAllTests();
      console.log('TestPage: Завантажено тести:', allTests);
      const foundTest = allTests.find((t) => t.id === parseInt(testId));
      if (foundTest) {
        setTest(foundTest);
        setTimeLeft(foundTest.timeLimit);
        setTestResults(JSON.parse(localStorage.getItem(`test_${testId}_results`) || '[]'));
      } else {
        console.warn(`TestPage: Тест з id ${testId} не знайдено`);
        navigate('/');
      }
    } catch (error) {
      console.error('TestPage: Помилка завантаження тесту:', error);
      navigate('/');
    }
  }, [testId, navigate]);

  // Таймер для тесту
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || !isTestStarted || isTestFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTestStarted, isTestFinished]);

  // Початок тесту
  const startTest = () => {
    if (!currentUser && !userName.trim()) {
      alert('Будь ласка, введіть ваше ім’я');
      return;
    }
    console.log('TestPage: Розпочато тест:', test.title);
    setIsTestStarted(true);
  };

  // Обробка вибору відповіді
  const handleAnswer = (option) => {
    console.log('TestPage: Вибрано відповідь:', { question: currentQuestionIndex + 1, option });
    setAnswers({ ...answers, [currentQuestionIndex]: option });
  };

  // Перехід до питання
  const goToQuestion = (index) => {
    console.log('TestPage: Перехід до питання:', index + 1);
    setCurrentQuestionIndex(index);
  };

  // Перехід до наступного питання
  const nextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log('TestPage: Наступне питання:', currentQuestionIndex + 2);
    } else {
      finishTest();
    }
  };

  // Завершення тесту та збереження результатів
  const finishTest = () => {
    setIsTestFinished(true);
    setIsTestStarted(false);
    const score = test.questions.reduce((acc, q, i) => {
      return answers[i] === q.correctAnswer ? acc + 1 : acc;
    }, 0);
    const total = test.questions.length;

    const resultName = currentUser ? currentUser.email : userName;
    const newResult = { name: resultName, score, total };
    const updatedResults = [...testResults, newResult];
    localStorage.setItem(`test_${test.id}_results`, JSON.stringify(updatedResults));
    setTestResults(updatedResults);
    console.log('TestPage: Тест завершено:', { score, total, resultName });
  };

  // Умовний рендеринг для завантаження тесту
  if (!test) return null;

  // Рендеринг сторінки тесту
  return (
    <>
      <Header />
      <main className="test-page">
        {/* Екран початку тесту */}
        {!isTestStarted && !isTestFinished && (
          <div className="test-start">
            <h2>{test.title}</h2>
            <p>Час: {Math.floor(test.timeLimit / 60)} хв {test.timeLimit % 60} сек</p>
            <p>Питань: {test.questions.length}</p>
            {!currentUser && (
              <div className="name-input">
                <label htmlFor="userName">Ваше ім’я:</label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Введіть ім’я"
                />
              </div>
            )}
            {currentUser && (
              <p>Ім’я: {currentUser.name}</p>
            )}
            <button onClick={startTest} className="start-btn">
              Розпочати тест
            </button>
          </div>
        )}

        {/* Екран проходження тесту */}
        {isTestStarted && !isTestFinished && (
          <div className="test-content">
            <h2>{test.title}</h2>
            <p>Залишилось часу: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
            <div className="question-nav">
              {test.questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToQuestion(i)}
                  className={`nav-btn ${i === currentQuestionIndex ? 'active' : ''} ${
                    answers[i] ? 'answered' : ''
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="question">
              <p>
                Питання {currentQuestionIndex + 1}: {test.questions[currentQuestionIndex].text}
              </p>
              {test.questions[currentQuestionIndex].image && (
                <img
                  src={test.questions[currentQuestionIndex].image}
                  alt="Питання"
                  className="question-image"
                />
              )}
              <div className="options">
                {test.questions[currentQuestionIndex].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option)}
                    className={`option-btn ${answers[currentQuestionIndex] === option ? 'selected' : ''}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={nextQuestion} className="next-btn">
              {currentQuestionIndex < test.questions.length - 1 ? 'Далі' : 'Завершити'}
            </button>
          </div>
        )}

        {/* Екран результатів тесту */}
        {isTestFinished && (
          <div className="test-results">
            <h2>Результати тесту: {test.title}</h2>
            <p>
              Ваш результат: {testResults[testResults.length - 1].score}/
              {testResults[testResults.length - 1].total} (
              {(
                (testResults[testResults.length - 1].score /
                  testResults[testResults.length - 1].total) *
                100
              ).toFixed(2)}
              %)
            </p>
            <h4>Огляд відповідей</h4>
            <div className="answer-review">
              {test.questions.map((question, i) => (
                <div
                  key={i}
                  className={`answer-item ${
                    answers[i] === question.correctAnswer ? 'correct-answer' : 'incorrect-answer'
                  }`}
                >
                  <p>
                    Питання {i + 1}: {question.text}
                  </p>
                  {question.image && (
                    <img src={question.image} alt={`Питання ${i + 1}`} className="question-image" />
                  )}
                  <p>Ваша відповідь: {answers[i] || 'Не відповіли'}</p>
                  <p>Правильна відповідь: {question.correctAnswer}</p>
                  <p>Статус: {answers[i] === question.correctAnswer ? 'Правильно' : 'Неправильно'}</p>
                </div>
              ))}
            </div>
            <h4>Статистика всіх учасників</h4>
            <div className="statistics">
              {testResults.length > 0 ? (
                <ul>
                  {testResults.map((result, index) => (
                    <li key={index}>
                      {result.name}: {result.score}/{result.total}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Ще ніхто не проходив цей тест</p>
              )}
            </div>
            <button onClick={() => navigate('/')} className="home-btn">
              На головну
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}