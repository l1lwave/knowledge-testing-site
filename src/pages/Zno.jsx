import { useState } from 'react';
import Header from '../components/Header';
import TestCard from '../components/TestCard';
import Footer from '../components/Footer';
import { znoTests } from '../data/znoTests';
import '../styles/Zno.css';

// Компонент сторінки ЗНО-тестів
export default function Zno() {
  // Список категорій
  const categories = ['Математика', 'Українська мова', 'Історія', 'Англійська'];
  // Стан для вибраної категорії
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Сортування тестів за спаданням ID
  const sortedTests = [...znoTests].sort((a, b) => b.id - a.id);

  // Фільтрація тестів за вибраною категорією
  const filteredTests = selectedCategory
    ? sortedTests.filter((test) => test.category === selectedCategory)
    : sortedTests;

  // Обробка кліку по категорії
  const handleCategoryClick = (category) => {
    console.log('Zno: Вибрано категорію:', category);
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  // Рендеринг сторінки ЗНО
  return (
    <>
      <Header />
      <main className="main-content">
        {/* Секція категорій */}
        <section>
          <h2>Категорії ЗНО тестів</h2>
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
          <h2>{selectedCategory ? `ЗНО тести з ${selectedCategory}` : 'Всі ЗНО тести'}</h2>
          <div className="test-list">
            {filteredTests.length > 0 ? (
              filteredTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))
            ) : (
              <p>Тестів цієї категорії немає.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}