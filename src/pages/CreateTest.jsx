import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllTests } from '../data/tests';
import '../styles/CreateTest.css';

// Компонент сторінки створення нового тесту
export default function CreateTest() {
  // Стани для користувача та даних тесту
  const [currentUser, setCurrentUser] = useState(null);
  const [testData, setTestData] = useState({
    title: '',
    category: '',
    timeLimit: '',
    questions: [{ text: '', image: '', options: ['', '', '', ''], correctAnswer: '' }],
  });
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Завантаження користувача та категорій тестів
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/auth');
      return;
    }
    setCurrentUser(user);

    try {
      const allTests = getAllTests();
      console.log('CreateTest: Завантажено всі тести:', allTests.length, allTests);
      const uniqueCategories = [...new Set(allTests.map((test) => test.category).filter(Boolean))];
      console.log('CreateTest: Категорії:', uniqueCategories);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('CreateTest: Помилка завантаження тестів:', error);
    }
  }, [navigate]);

  // Обробка змін полів тесту
  const handleTestChange = (e) => {
    const { name, value } = e.target;
    console.log('CreateTest: Зміна тесту:', { name, value });
    if (name === 'category') {
      setIsNewCategory(value === 'new');
      setTestData((prev) => ({ ...prev, category: value }));
    } else {
      setTestData((prev) => ({
        ...prev,
        [name]: name === 'timeLimit' ? parseInt(value) * 60 || '' : value,
      }));
    }
  };

  // Обробка нової категорії
  const handleNewCategoryChange = (e) => {
    const value = e.target.value;
    console.log('CreateTest: Нова категорія:', value);
    setNewCategory(value);
  };

  // Обробка змін питання
  const handleQuestionChange = (index, field, value) => {
    console.log('CreateTest: Зміна питання:', { index, field, value });
    const updatedQuestions = [...testData.questions];
    updatedQuestions[index][field] = value;
    setTestData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  // Обробка змін варіантів відповіді
  const handleOptionChange = (qIndex, oIndex, value) => {
    console.log('CreateTest: Зміна варіанту:', { qIndex, oIndex, value });
    const updatedQuestions = [...testData.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    if (updatedQuestions[qIndex].correctAnswer === updatedQuestions[qIndex].options[oIndex]) {
      updatedQuestions[qIndex].correctAnswer = value;
    }
    setTestData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  // Обробка вибору правильної відповіді
  const handleCorrectAnswerChange = (qIndex, value) => {
    console.log('CreateTest: Зміна правильної відповіді:', { qIndex, value });
    const updatedQuestions = [...testData.questions];
    updatedQuestions[qIndex].correctAnswer = value;
    setTestData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  // Додавання нового питання
  const addQuestion = () => {
    console.log('CreateTest: Додавання питання');
    setTestData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { text: '', image: '', options: ['', '', '', ''], correctAnswer: '' },
      ],
    }));
  };

  // Видалення питання
  const removeQuestion = (index) => {
    console.log('CreateTest: Видалення питання:', index);
    if (testData.questions.length > 1) {
      const updatedQuestions = testData.questions.filter((_, i) => i !== index);
      setTestData((prev) => ({ ...prev, questions: updatedQuestions }));
    }
  };

  // Валідація тесту перед збереженням
  const validateTest = () => {
    console.log('CreateTest: Валідація тесту:', testData);
    if (!testData.title.trim()) return 'Назва тесту обов’язкова';
    if (!isNewCategory && !testData.category.trim()) return 'Категорія обов’язкова';
    if (isNewCategory && !newCategory.trim()) return 'Нова категорія обов’язкова';
    if (!testData.timeLimit || testData.timeLimit < 60) return 'Час має бути не менше 1 хвилини';
    for (let i = 0; i < testData.questions.length; i++) {
      const q = testData.questions[i];
      if (!q.text.trim()) return `Текст питання ${i + 1} обов’язковий`;
      for (const opt of q.options) {
        if (!opt.trim()) return `Усі варіанти відповіді в питанні ${i + 1} обов’язкові`;
      }
      if (!q.correctAnswer.trim() || !q.options.includes(q.correctAnswer)) {
        return `Правильна відповідь у питанні ${i + 1} має бути одним із варіантів`;
      }
    }
    return null;
  };

  // Збереження тесту в localStorage
  const saveTest = () => {
    console.log('CreateTest: Збереження тесту');
    const error = validateTest();
    if (error) {
      console.error('CreateTest: Помилка валідації:', error);
      alert(error);
      return;
    }

    try {
      const allTests = getAllTests();
      console.log('CreateTest: Усі тести для maxId:', allTests.length);
      const maxId = allTests.length > 0 ? Math.max(...allTests.map((t) => t.id)) : 0;
      const newTest = {
        id: maxId + 1,
        title: testData.title,
        category: isNewCategory ? newCategory : testData.category,
        timeLimit: testData.timeLimit,
        author: currentUser.email,
        questions: testData.questions.map((q) => ({
          text: q.text,
          image: q.image || null,
          options: q.options,
          correctAnswer: q.correctAnswer,
        })),
      };

      console.log('CreateTest: Новий тест:', newTest);
      let customTests = JSON.parse(localStorage.getItem('custom_tests') || '[]');
      if (!Array.isArray(customTests)) {
        console.warn('CreateTest: custom_tests не є масивом, скидаємо до []');
        customTests = [];
      }
      customTests.push(newTest);
      localStorage.setItem('custom_tests', JSON.stringify(customTests));
      console.log('CreateTest: custom_tests після збереження:', customTests);

      alert('Тест успішно збережено!');
      navigate('/profile');
    } catch (error) {
      console.error('CreateTest: Помилка збереження тесту:', error);
      alert('Помилка при збереженні тесту. Перевірте консоль.');
    }
  };

  // Умовний рендеринг для редіректу
  if (!currentUser) return null;

  // Рендеринг форми створення тесту
  return (
    <>
      <Header />
      <div className="create-test-container">
        <h2>Створити новий тест</h2>
        <div className="create-test-form">
          <div className="form-group">
            <label htmlFor="title">Назва тесту:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={testData.title}
              onChange={handleTestChange}
              placeholder="Введіть назву"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Категорія:</label>
            <select
              id="category"
              name="category"
              value={testData.category}
              onChange={handleTestChange}
            >
              <option value="">Оберіть категорію</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="new">Нова категорія</option>
            </select>
            {isNewCategory && (
              <input
                type="text"
                value={newCategory}
                onChange={handleNewCategoryChange}
                placeholder="Введіть нову категорію"
              />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="timeLimit">Час на тест (хвилини):</label>
            <input
              type="number"
              id="timeLimit"
              name="timeLimit"
              value={testData.timeLimit / 60 || ''}
              onChange={handleTestChange}
              min="1"
              placeholder="Введіть час"
            />
          </div>
          <h3>Питання</h3>
          {testData.questions.map((question, qIndex) => (
            <div key={qIndex} className="question-group">
              <div className="form-group">
                <label>Питання {qIndex + 1}:</label>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                  placeholder="Введіть текст питання"
                />
              </div>
              <div className="form-group">
                <label>Посилання на зображення (опціонально):</label>
                <input
                  type="text"
                  value={question.image}
                  onChange={(e) => handleQuestionChange(qIndex, 'image', e.target.value)}
                  placeholder="Введіть URL зображення"
                />
              </div>
              <div className="form-group">
                <label>Варіанти відповіді:</label>
                {question.options.map((option, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    placeholder={`Варіант ${oIndex + 1}`}
                  />
                ))}
              </div>
              <div className="form-group">
                <label htmlFor={`correctAnswer-${qIndex}`}>Правильна відповідь:</label>
                <select
                  id={`correctAnswer-${qIndex}`}
                  value={question.correctAnswer}
                  onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                >
                  <option value="">Оберіть правильну відповідь</option>
                  {question.options
                    .filter((opt) => opt.trim())
                    .map((option, oIndex) => (
                      <option key={oIndex} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>
              <button
                onClick={() => removeQuestion(qIndex)}
                className="remove-btn"
                disabled={testData.questions.length === 1}
              >
                Видалити питання
              </button>
            </div>
          ))}
          <button onClick={addQuestion} className="add-btn">
            Додати питання
          </button>
          <button onClick={saveTest} className="save-btn">
            Зберегти тест
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}