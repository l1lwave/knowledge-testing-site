export const znoTests = [
  // Математика
  {
    id: 101,
    title: 'ЗНО з математики 2022',
    category: 'Математика',
    timeLimit: 1200,
    questions: [
      { text: 'Скільки буде 5 × 3?', options: ['12', '15', '18', '20'], correctAnswer: '15' },
      { text: 'Яке значення cos(0°)?', options: ['0', '1', '-1', '1/2'], correctAnswer: '1' },
      { text: 'Розв’яжіть: 2x + 3 = 7', options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'], correctAnswer: 'x = 2' },
      { text: 'Що більше: 2³ чи 3²?', options: ['2³', '3²', 'Рівні', 'Залежить'], correctAnswer: '3²' },
      { text: 'Яка площина трикутника: основа 4, висота 3?', options: ['6', '12', '8', '10'], correctAnswer: '6' },
    ],
  },
  {
    id: 102,
    title: 'ЗНО з математики 2023',
    category: 'Математика',
    timeLimit: 1200,
    questions: [
      { text: 'Скільки буде 7 + 8?', options: ['13', '14', '15', '16'], correctAnswer: '15' },
      { text: 'Яке значення tan(45°)?', options: ['0', '1', '-1', '√2'], correctAnswer: '1' },
      { text: 'Розв’яжіть: 3x - 6 = 0', options: ['x = 1', 'x = 2', 'x = 3', 'x = 0'], correctAnswer: 'x = 2' },
      { text: 'Скільки коренів у x² + 1 = 0?', options: ['0', '1', '2', '3'], correctAnswer: '0' },
      { text: 'Яка довжина кола: r = 2?', options: ['2π', '4π', '6π', '8π'], correctAnswer: '4π' },
    ],
  },
  {
    id: 103,
    title: 'ЗНО з математики 2024',
    category: 'Математика',
    timeLimit: 1200,
    questions: [
      { text: 'Скільки буде 9 - 4?', options: ['3', '4', '5', '6'], correctAnswer: '5' },
      { text: 'Яке значення sin(30°)?', options: ['0', '1', '1/2', '-1/2'], correctAnswer: '1/2' },
      { text: 'Розв’яжіть: x/2 = 4', options: ['x = 2', 'x = 4', 'x = 6', 'x = 8'], correctAnswer: 'x = 8' },
      { text: 'Який периметр квадрата: сторона 5?', options: ['10', '15', '20', '25'], correctAnswer: '20' },
      { text: 'Що дорівнює 2⁴?', options: ['8', '12', '16', '20'], correctAnswer: '16' },
    ],
  },
  {
    id: 104,
    title: 'ЗНО з математики 2025',
    category: 'Математика',
    timeLimit: 1200,
    questions: [
      { text: 'Скільки буде 6 × 4?', options: ['20', '22', '24', '26'], correctAnswer: '24' },
      {
        text: 'На графіку зображено функцію y = x². Яке значення y при x = 2?',
        options: ['0', '2', '4', '6'],
        correctAnswer: '4',
        image: 'https://images.unsplash.com/photo-1636321893740-77b568c5c7b9'
      },
      { text: 'Розв’яжіть: 4x = 12', options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'], correctAnswer: 'x = 3' },
      { text: 'Яка сума кутів трикутника?', options: ['90°', '180°', '270°', '360°'], correctAnswer: '180°' },
      { text: 'Що дорівнює √16?', options: ['2', '3', '4', '5'], correctAnswer: '4' },
    ],
  },
  // Українська мова
  {
    id: 105,
    title: 'ЗНО з української мови 2022',
    category: 'Українська мова',
    timeLimit: 1200,
    questions: [
      { text: 'Який розділовий знак у кінці питального речення?', options: ['Крапка', 'Кома', 'Знак питання', 'Знак оклику'], correctAnswer: 'Знак питання' },
      { text: 'Правильне написання:', options: ['Пів-Яблука', 'Півяблука', 'Пів яблука', 'Пів’яблука'], correctAnswer: 'Пів’яблука' },
      { text: 'Що таке синонім?', options: ['Протилежне слово', 'Схоже за значенням', 'Частина мови', 'Наголос'], correctAnswer: 'Схоже за значенням' },
      { text: 'Вкажіть дієслово:', options: ['Бігти', 'Швидкий', 'Швидкість', 'Швидко'], correctAnswer: 'Бігти' },
      { text: 'Скільки букв в алфавіті?', options: ['30', '32', '33', '34'], correctAnswer: '33' },
    ],
  },
  {
    id: 106,
    title: 'ЗНО з української мови 2023',
    category: 'Українська мова',
    timeLimit: 1200,
    questions: [
      { text: 'Який розділовий знак у кінці окличного речення?', options: ['Крапка', 'Кома', 'Знак питання', 'Знак оклику'], correctAnswer: 'Знак оклику' },
      { text: 'Правильне написання:', options: ['Сонцесяйний', 'Сонцесяйний', 'Сонячносяйний', 'Сонцесіяйний'], correctAnswer: 'Сонцесіяйний' },
      { text: 'Що таке антонім?', options: ['Схоже слово', 'Протилежне слово', 'Частина мови', 'Наголос'], correctAnswer: 'Протилежне слово' },
      { text: 'Вкажіть прикметник:', options: ['Бігти', 'Швидкий', 'Швидкість', 'Швидко'], correctAnswer: 'Швидкий' },
      { text: 'Яка частина мови "і"?', options: ['Сполучник', 'Прийменник', 'Частка', 'Вигук'], correctAnswer: 'Сполучник' },
    ],
  },
  {
    id: 107,
    title: 'ЗНО з української мови 2024',
    category: 'Українська мова',
    timeLimit: 1200,
    questions: [
      { text: 'Який розділовий знак між однорідними членами?', options: ['Крапка', 'Кома', 'Двокрапка', 'Тире'], correctAnswer: 'Кома' },
      { text: 'Правильне написання:', options: ['Вітроенергія', 'Вітро-енергія', 'Вітроенергия', 'Вітро енергія'], correctAnswer: 'Вітроенергія' },
      { text: 'Що таке омонім?', options: ['Схоже слово', 'Різне значення', 'Протилежне слово', 'Однакове звучання'], correctAnswer: 'Однакове звучання' },
      { text: 'Вкажіть іменник:', options: ['Бігти', 'Швидкий', 'Швидкість', 'Швидко'], correctAnswer: 'Швидкість' },
      { text: 'Яка частина мови "швидко"?', options: ['Дієслово', 'Прикметник', 'Прислівник', 'Іменник'], correctAnswer: 'Прислівник' },
    ],
  },
  {
    id: 108,
    title: 'ЗНО з української мови 2025',
    category: 'Українська мова',
    timeLimit: 1200,
    questions: [
      { text: 'Який розділовий знак перед поясненням?', options: ['Крапка', 'Кома', 'Двокрапка', 'Тире'], correctAnswer: 'Двокрапка' },
      {
        text: 'На зображенні текст із помилкою. Вкажіть правильне написання слова.',
        options: ['Екотехнологія', 'Еко-технологія', 'Екотехнологя', 'Еко технологія'],
        correctAnswer: 'Екотехнологія',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' 
      },
      { text: 'Що таке паронім?', options: ['Схоже слово', 'Різне значення', 'Схоже звучання', 'Протилежне слово'], correctAnswer: 'Схоже звучання' },
      { text: 'Вкажіть вигук:', options: ['Ой', 'Швидкий', 'Швидкість', 'Швидко'], correctAnswer: 'Ой' },
      { text: 'Яка частина мови "на"?', options: ['Сполучник', 'Прийменник', 'Частка', 'Вигук'], correctAnswer: 'Прийменник' },
    ],
  },
  // Історія
  {
    id: 109,
    title: 'ЗНО з історії України 2022',
    category: 'Історія',
    timeLimit: 1200,
    questions: [
      { text: 'Рік хрещення Русі?', options: ['988', '1015', '1054', '1240'], correctAnswer: '988' },
      { text: 'Хто заснував Київ?', options: ['Олег', 'Кий', 'Ярослав', 'Володимир'], correctAnswer: 'Кий' },
      { text: 'Рік Берестейської унії?', options: ['1569', '1596', '1648', '1709'], correctAnswer: '1596' },
      { text: 'Гетьман часів Руїни?', options: ['Мазепа', 'Дорошенко', 'Хмельницький', 'Сагайдачний'], correctAnswer: 'Дорошенко' },
      { text: 'Рік Полтавської битви?', options: ['1648', '1709', '1711', '1721'], correctAnswer: '1709' },
    ],
  },
  {
    id: 110,
    title: 'ЗНО з історії України 2023',
    category: 'Історія',
    timeLimit: 1200,
    questions: [
      { text: 'Рік Люблінської унії?', options: ['1569', '1596', '1648', '1709'], correctAnswer: '1569' },
      { text: 'Хто автор "Енеїди"?', options: ['Котляревський', 'Шевченко', 'Франко', 'Сковорода'], correctAnswer: 'Котляревський' },
      { text: 'Рік Зборівської угоди?', options: ['1648', '1649', '1654', '1657'], correctAnswer: '1649' },
      { text: 'Гетьман часів Коліївщини?', options: ['Мазепа', 'Залізняк', 'Хмельницький', 'Дорошенко'], correctAnswer: 'Залізняк' },
      { text: 'Рік Переяславської ради?', options: ['1648', '1654', '1709', '1711'], correctAnswer: '1654' },
    ],
  },
  {
    id: 111,
    title: 'ЗНО з історії України 2024',
    category: 'Історія',
    timeLimit: 1200,
    questions: [
      { text: 'Рік Галицько-Волинської держави?', options: ['1199', '1240', '1340', '1385'], correctAnswer: '1199' },
      { text: 'Хто автор "Кобзаря"?', options: ['Котляревський', 'Шевченко', 'Франко', 'Сковорода'], correctAnswer: 'Шевченко' },
      { text: 'Рік Гадяцької угоди?', options: ['1648', '1654', '1658', '1709'], correctAnswer: '1658' },
      { text: 'Гетьман часів Хмельниччини?', options: ['Мазепа', 'Залізняк', 'Хмельницький', 'Дорошенко'], correctAnswer: 'Хмельницький' },
      { text: 'Рік скасування кріпацтва?', options: ['1848', '1861', '1871', '1881'], correctAnswer: '1861' },
    ],
  },
  {
    id: 112,
    title: 'ЗНО з історії України 2025',
    category: 'Історія',
    timeLimit: 1200,
    questions: [
      { text: 'Рік заснування Запорізької Січі?', options: ['1550', '1556', '1569', '1596'], correctAnswer: '1556' },
      {
        text: 'На карті позначено місце битви. Яка це битва (1709)?',
        options: ['Полтавська', 'Берестецька', 'Зборівська', 'Батуринська'],
        correctAnswer: 'Полтавська',
        image: 'http://www.battle.poltava.ua/images/map1.jpg' // Карта Полтавської битви
      },
      { text: 'Хто автор "Літопису"?', options: ['Самовидець', 'Шевченко', 'Франко', 'Сковорода'], correctAnswer: 'Самовидець' },
      { text: 'Гетьман часів гетьманщини?', options: ['Мазепа', 'Залізняк', 'Хмельницький', 'Скоропадський'], correctAnswer: 'Скоропадський' },
      { text: 'Рік проголошення УНР?', options: ['1917', '1918', '1919', '1920'], correctAnswer: '1917' },
    ],
  },
  // Англійська
  {
    id: 113,
    title: 'ЗНО з англійської мови 2022',
    category: 'Англійська',
    timeLimit: 1200,
    questions: [
      { text: 'Past tense of "be"?', options: ['Is', 'Was', 'Been', 'Being'], correctAnswer: 'Was' },
      { text: 'Article: ___ sun', options: ['A', 'An', 'The', 'No article'], correctAnswer: 'The' },
      { text: 'Synonym of "big"?', options: ['Small', 'Large', 'Tiny', 'Short'], correctAnswer: 'Large' },
      { text: 'Plural of "child"?', options: ['Childs', 'Children', 'Childes', 'Child'], correctAnswer: 'Children' },
      { text: 'I ___ to school.', options: ['Go', 'Goes', 'Going', 'Gone'], correctAnswer: 'Go' },
    ],
  },
  {
    id: 114,
    title: 'ЗНО з англійської мови 2023',
    category: 'Англійська',
    timeLimit: 1200,
    questions: [
      { text: 'Past tense of "see"?', options: ['Saw', 'Seen', 'Sees', 'Seeing'], correctAnswer: 'Saw' },
      { text: 'Article: ___ apple', options: ['A', 'An', 'The', 'No article'], correctAnswer: 'An' },
      { text: 'Antonym of "hot"?', options: ['Warm', 'Cold', 'Cool', 'Burning'], correctAnswer: 'Cold' },
      { text: 'Plural of "mouse"?', options: ['Mouses', 'Mice', 'Mouse', 'Mices'], correctAnswer: 'Mice' },
      { text: 'She ___ a book.', options: ['Read', 'Reads', 'Reading', 'Readed'], correctAnswer: 'Reads' },
    ],
  },
  {
    id: 115,
    title: 'ЗНО з англійської мови 2024',
    category: 'Англійська',
    timeLimit: 1200,
    questions: [
      { text: 'Past tense of "buy"?', options: ['Bought', 'Buyed', 'Buys', 'Buying'], correctAnswer: 'Bought' },
      { text: 'Article: ___ water', options: ['A', 'An', 'The', 'No article'], correctAnswer: 'No article' },
      { text: 'Synonym of "happy"?', options: ['Sad', 'Joyful', 'Angry', 'Tired'], correctAnswer: 'Joyful' },
      { text: 'Plural of "foot"?', options: ['Foots', 'Feet', 'Footes', 'Foot'], correctAnswer: 'Feet' },
      { text: 'They ___ TV.', options: ['Watch', 'Watches', 'Watching', 'Watched'], correctAnswer: 'Watch' },
    ],
  },
  {
    id: 116,
    title: 'ЗНО з англійської мови 2025',
    category: 'Англійська',
    timeLimit: 1200,
    questions: [
      { text: 'Past tense of "run"?', options: ['Ran', 'Runed', 'Runs', 'Running'], correctAnswer: 'Ran' },
      {
        text: 'What is shown in the picture?',
        options: ['A cat', 'A dog', 'A bird', 'A fish'],
        correctAnswer: 'A dog',
        image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6' // Забраження собаки
      },
      { text: 'Article: ___ moon', options: ['A', 'An', 'The', 'No article'], correctAnswer: 'The' },
      { text: 'Antonym of "fast"?', options: ['Quick', 'Slow', 'Rapid', 'Speedy'], correctAnswer: 'Slow' },
      { text: 'Plural of "man"?', options: ['Mans', 'Men', 'Manes', 'Man'], correctAnswer: 'Men' },
    ],
  },
];