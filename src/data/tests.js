import { znoTests } from './znoTests';

export const tests = [
  {
    id: 1,
    title: 'Тест з математики 2023',
    category: 'Математика',
    timeLimit: 300, // 5 минут
    author: 'admin@example.com',
    questions: [
      { text: 'Скільки буде 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4' },
      { text: 'Яке значення sin(90°)?', options: ['0', '1', '-1', '1/2'], correctAnswer: '1' },
      { text: 'Розв’яжіть рівняння: x² - 4 = 0', options: ['x = ±2', 'x = ±4', 'x = 0', 'x = ±1'], correctAnswer: 'x = ±2' },
    ],
  },
  {
    id: 2,
    title: 'Тест з української мови 2023',
    category: 'Українська мова',
    timeLimit: 180, // 3 минуты
    author: 'admin@example.com',
    questions: [
      { text: 'Який розділовий знак ставиться в кінці розповідного речення?', options: ['Крапка', 'Кома', 'Знак питання', 'Знак оклику'], correctAnswer: 'Крапка' },
      { text: 'Вкажіть правильне написання слова:', options: ['Казати', 'Казать', 'Говорити', 'Сказати'], correctAnswer: 'Сказати' },
    ],
  },
  {
    id: 3,
    title: 'Тест з історії України 2023',
    category: 'Історія',
    timeLimit: 240, // 4 минуты
    author: 'admin@example.com',
    questions: [
      { text: 'У якому році відбулася Хмельниччина?', options: ['1648', '1709', '1569', '1654'], correctAnswer: '1648' },
      { text: 'Хто був гетьманом під час Коліївщини?', options: ['Богдан Хмельницький', 'Максим Залізняк', 'Іван Мазепа', 'Петро Дорошенко'], correctAnswer: 'Максим Залізняк' },
    ],
  },
  {
    id: 4,
    title: 'Тест з англійської мови 2023',
    category: 'Англійська',
    timeLimit: 120, // 2 минуты
    author: 'admin@example.com',
    questions: [
      { text: 'What is the past tense of "go"?', options: ['Goes', 'Went', 'Gone', 'Going'], correctAnswer: 'Went' },
      { text: 'Choose the correct article: ___ apple', options: ['A', 'An', 'The', 'No article'], correctAnswer: 'An' },
    ],
  },
  {
    id: 5,
    title: 'Тест з JavaScript 2023',
    category: 'Програмування',
    timeLimit: 240, // 4 минуты
    author: 'admin@example.com',
    questions: [
      {
        text: 'Який метод використовується для додавання елемента в кінець масиву в JavaScript?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 'push()',
      },
      {
        text: 'Що поверне вираз: typeof null?',
        options: ['"null"', '"object"', '"undefined"', '"boolean"'],
        correctAnswer: '"object"',
      },
      {
        text: 'Як оголосити константу в JavaScript?',
        options: ['let', 'var', 'const', 'static'],
        correctAnswer: 'const',
      },
    ],
  },
  {
    id: 6,
    title: 'Тест з Python 2023',
    category: 'Програмування',
    timeLimit: 180, // 3 минуты
    author: 'admin@example.com',
    questions: [
      {
        text: 'Який оператор використовується для цілочисельного ділення в Python?',
        options: ['/', '//', '%', '**'],
        correctAnswer: '//',
      },
      {
        text: 'Як отримати довжину списку в Python?',
        options: ['len()', 'size()', 'length()', 'count()'],
        correctAnswer: 'len()',
      },
      {
        text: 'Що виведе код: print("Hello"[1])?',
        options: ['"H"', '"e"', '"l"', 'Помилка'],
        correctAnswer: '"e"',
      },
    ],
  },
  {
    id: 7,
    title: 'Тест з основ программирования 2023',
    category: 'Програмування',
    timeLimit: 180, // 3 минуты
    author: 'admin@example.com',
    questions: [
      {
        text: 'Що таке рекурсія в программировании?',
        options: [
          'Цикл for',
          'Функція, яка викликає сама себе',
          'Умовний оператор',
          'Масив даних',
        ],
        correctAnswer: 'Функція, яка викликає сама себе',
      },
      {
        text: 'Яка структура даних працює за принципом "першим увійшов, останнім вийшов"?',
        options: ['Черга', 'Стек', 'Список', 'Дерево'],
        correctAnswer: 'Стек',
      },
      {
        text: 'Що означає аббревиатура OOP?',
        options: [
          'Object-Oriented Programming',
          'Operational Object Processing',
          'Optimal Output Programming',
          'Ordered Operation Protocol',
        ],
        correctAnswer: 'Object-Oriented Programming',
      },
    ],
  },
];

export const getAllTests = () => {
  try {
    const customTests = JSON.parse(localStorage.getItem('custom_tests') || '[]');
    if (!Array.isArray(customTests)) {
      console.warn('getAllTests: custom_tests is not an array, resetting to []');
      return [...tests, ...znoTests];
    }
    const allTests = [...tests, ...znoTests, ...customTests];
    console.log('getAllTests: Total tests:', allTests.length, allTests); // Лог
    return allTests;
  } catch (error) {
    console.error('getAllTests: Error parsing custom_tests:', error);
    return [...tests, ...znoTests];
  }
};