import { useState, useEffect } from 'react';
import Header from '../components/Header';
import TestCard from '../components/TestCard';
import Footer from '../components/Footer';
import { getAllTests } from '../data/tests';
import '../styles/Home.css';

// Компонент головної сторінки з тестами
export default function Home() {
  // Стани для тестів, категорій, пошуку та вибраної категорії
  const [tests, setTests] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Завантаження тестів та категорій при монтуванні компонента
  useEffect(() => {
    try {
      const loadedTests = getAllTests();
      console.log('Home: Завантажено тести:', loadedTests.length, loadedTests);
      setTests(loadedTests);
      const uniqueCategories = [...new Set(loadedTests.map((test) => test.category).filter(Boolean))];
      console.log('Home: Категорії:', uniqueCategories);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Home: Помилка завантаження тестів:', error);
    }
  }, []);

  // Сортування та фільтрація тестів
  const sortedTests = [...tests].sort((a, b) => b.id - a.id);
  const filteredTests = sortedTests.filter((test) => {
    const matchesCategory = selectedCategory ? test.category === selectedCategory : true;
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Обробка вибору категорії
  const handleCategoryClick = (category) => {
    console.log('Home: Вибрано категорію:', category);
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  // Рендеринг головної сторінки
  return (
    <>
      <Header />
      <main className="main-content">
        {/* Секція категорій */}
        <section>
          <h2>Категорії тестів</h2>
          <div className="category-buttons">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => handleCategoryClick(cat)}
                style={{
                  backgroundColor: selectedCategory === cat ? '#ac00ff' : '#9a01c8',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
        {/* Секція тестів */}
        <section>
          <h2>{selectedCategory ? `Тести з ${selectedCategory}` : 'Всі тести'}</h2>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Пошук тестів за назвою..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="test-list">
            {filteredTests.length > 0 ? (
              filteredTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))
            ) : (
              <p>Тестів не знайдено.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}