import { useNavigate } from 'react-router-dom';
import '../styles/TestCard.css';

// Компонент картки тесту
export default function TestCard({ test }) {
  const navigate = useNavigate();

  // Обробка початку тесту
  const handleStart = () => {
    navigate(`/test/${test.id}`);
  };

  // Рендеринг картки
  return (
    <div className="test-card">
      <div className="test-title">{test.title}</div>
      <div className="test-category">{test.category}</div>
      <button className="start-btn" onClick={handleStart}>
        Почати
      </button>
    </div>
  );
}