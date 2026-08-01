export interface Article {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  categorySlug: string;
  date: string;
  author: string;
  image: string;
  readingTime: number;
  keywords: string[];
  faq?: Array<{ question: string; answer: string }>;
}

export const articles: Article[] = [
  // ===== СТАТЬЯ 1: ЗАПРАВКА КОНДИЦИОНЕРА =====
  {
    id: 1,
    slug: "kak-zapravit-kondicioner-v-avtomobile",
    title: "Как правильно заправить кондиционер в автомобиле?",
    description:
      "Полное руководство по заправке автокондиционера: признаки утечки фреона, этапы работ и советы профессионалов.",
    category: "Ремонт кондиционеров",
    categorySlug: "remont-kondicionerov",
    date: "2026-07-15",
    author: "Nexton",
    image: "/images/blog/kondicioner.jpg",
    readingTime: 5,
    keywords: ["заправка кондиционера", "фреон", "Полоцк", "Новополоцк"],
    faq: [
      {
        question: "Как часто нужно заправлять кондиционер?",
        answer: "Рекомендуется проверять систему каждые 2-3 года.",
      },
    ],
    content: `
      <h2>Как понять, что кондиционер пора заправлять?</h2>
      <p>Основные признаки того, что ваш автокондиционер нуждается в заправке:</p>
      <ul>
        <li>❄️ Кондиционер дует теплым воздухом</li>
        <li>🔊 Посторонние шумы при включении</li>
        <li>💧 Маслянистые пятна под автомобилем</li>
      </ul>
      
      <h2>Профессиональная заправка кондиционера</h2>
      <p>В сервисе <a href="/polotsk" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Nexton в Полоцке</a> и <a href="/novopolotsk" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Nexton в Новополоцке</a> мы выполняем заправку кондиционеров любой сложности.</p>

      <div class="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg my-4 border-l-4 border-[#1e3a5f] dark:border-[#7a9bcb]">
        <p class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb]">💡 Нужна заправка кондиционера?</p>
        <p class="text-gray-700 dark:text-gray-300">
          <a href="/polotsk/usluga/zapravka-kondicionera" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Заправка кондиционера в Полоцке</a> — профессионально, с гарантией.
        </p>
      </div>
    `,
  },

  // ===== СТАТЬЯ 2: УТЕЧКА ФРЕОНА =====
  {
    id: 2,
    slug: "remont-kondicionera-utechka-freona",
    title: "Утечка фреона: как найти и устранить?",
    description:
      "Полное руководство по поиску и устранению утечек фреона в автокондиционере.",
    category: "Ремонт кондиционеров",
    categorySlug: "remont-kondicionerov",
    date: "2026-07-10",
    author: "Nexton",
    image: "/images/blog/utechka.jpg",
    readingTime: 7,
    keywords: ["утечка фреона", "ремонт кондиционера", "Полоцк"],
    faq: [
      {
        question: "Как найти утечку фреона?",
        answer: "Используем электронные течеискатели и УФ-диагностику.",
      },
    ],
    content: `
      <h2>Как найти утечку фреона?</h2>
      <p>В сервисе <a href="/polotsk" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Nexton в Полоцке</a> мы используем три метода диагностики:</p>
      <ol>
        <li><strong>Электронный течеискатель</strong> — самый точный метод</li>
        <li><strong>УФ-диагностика</strong> — с красителем</li>
        <li><strong>Опрессовка азотом</strong> — проверка давления</li>
      </ol>

      <div class="bg-yellow-50 dark:bg-gray-800 p-4 rounded-lg my-4 border-l-4 border-[#1e3a5f] dark:border-[#7a9bcb]">
        <p class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb]">⚠️ Важно!</p>
        <p class="text-gray-700 dark:text-gray-300">
          <a href="/polotsk/usluga/remont-kondicionera-utechki" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Ремонт утечек кондиционера в Полоцке</a> — найдем и устраним любую утечку.
        </p>
      </div>
    `,
  },

  // ===== СТАТЬЯ 3: САЛОННЫЙ ФИЛЬТР =====
  {
    id: 3,
    slug: "kak-chasto-menat-salonnyy-filtr",
    title: "Как часто менять салонный фильтр и почему это важно?",
    description: "Салонный фильтр — важный элемент системы кондиционирования.",
    category: "Ремонт кондиционеров",
    categorySlug: "remont-kondicionerov",
    date: "2026-07-05",
    author: "Nexton",
    image: "/images/blog/filtr.jpg",
    readingTime: 4,
    keywords: ["салонный фильтр", "замена фильтра", "Полоцк"],
    faq: [
      {
        question: "Как часто менять салонный фильтр?",
        answer: "Каждые 15 000 км или раз в год.",
      },
    ],
    content: `
      <h2>Зачем нужен салонный фильтр?</h2>
      <p>В <a href="/polotsk" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Nexton в Полоцке</a> мы не только заменяем фильтры, но и проводим полную <a href="/polotsk/usluga/diagnostika-kondicionera" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">диагностику кондиционера</a>.</p>
    `,
  },

  // ===== СТАТЬЯ 4: НЕ РАБОТАЕТ КОНДИЦИОНЕР =====
  {
    id: 4,
    slug: "pochemu-ne-rabotaet-kondicioner",
    title: "5 причин, почему не работает кондиционер в машине",
    description:
      "Разбираем самые частые причины неисправности автокондиционера.",
    category: "Ремонт кондиционеров",
    categorySlug: "remont-kondicionerov",
    date: "2026-06-28",
    author: "Nexton",
    image: "/images/blog/kondicioner-ne-rabotaet.jpg",
    readingTime: 6,
    keywords: ["не работает кондиционер", "ремонт кондиционера"],
    faq: [
      {
        question: "Почему кондиционер не включается?",
        answer:
          "Причин может быть несколько: утечка фреона, неисправность компрессора.",
      },
    ],
    content: `
      <h2>Топ-5 причин неисправности</h2>
      <h3>1. Утечка фреона</h3>
      <p><strong>Решение:</strong> <a href="/polotsk/usluga/zapravka-kondicionera" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Заправка кондиционера в Полоцке</a></p>

      <h3>2. Неисправность компрессора</h3>
      <p><strong>Решение:</strong> <a href="/polotsk/usluga/zamena-kompressora" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Замена компрессора в Полоцке</a></p>

      <h3>3. Забитый радиатор кондиционера</h3>
      <p><strong>Решение:</strong> <a href="/polotsk/usluga/promyvka-sistemy" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Промывка системы в Полоцке</a></p>

      <div class="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg my-4 border-l-4 border-[#1e3a5f] dark:border-[#7a9bcb]">
        <p class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb]">🔧 Нужен ремонт кондиционера?</p>
        <p class="text-gray-700 dark:text-gray-300">
          <a href="/polotsk" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Nexton в Полоцке</a> — профессиональный ремонт с гарантией.
        </p>
      </div>
    `,
  },

  // ===== СТАТЬЯ 5: РЕМОНТ WEBASTO =====
  {
    id: 5,
    slug: "remont-webasto-polotsk",
    title: "Ремонт Webasto в Полоцке и Новополоцке",
    description: "Профессиональный ремонт автономных отопителей Webasto.",
    category: "Ремонт Webasto",
    categorySlug: "remont-webasto",
    date: "2026-06-20",
    author: "Nexton",
    image: "/images/blog/webasto.jpg",
    readingTime: 6,
    keywords: ["ремонт webasto", "вебасто", "Полоцк", "Новополоцк"],
    faq: [
      {
        question: "Почему Webasto не запускается?",
        answer: "Неисправная свеча накаливания или забитая камера сгорания.",
      },
    ],
    content: `
      <h2>Ремонт Webasto в Полоцке и Новополоцке</h2>
      <p>Выполняем ремонт любой сложности в <a href="/polotsk" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Nexton в Полоцке</a>.</p>

      <div class="bg-green-50 dark:bg-gray-800 p-4 rounded-lg my-4 border-l-4 border-[#1e3a5f] dark:border-[#7a9bcb]">
        <p class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb]">🔧 Ремонт Webasto</p>
        <p class="text-gray-700 dark:text-gray-300">
          <a href="/polotsk/usluga/remont-otopiteley" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Ремонт отопителей в Полоцке</a> — гарантия до 6 месяцев.
        </p>
      </div>
    `,
  },

  // ===== СТАТЬЯ 6: ДИАГНОСТИКА WEBASTO =====
  {
    id: 6,
    slug: "diagnostika-webasto-polotsk",
    title: "Диагностика Webasto в Полоцке",
    description: "Компьютерная диагностика Webasto в Полоцке.",
    category: "Ремонт Webasto",
    categorySlug: "remont-webasto",
    date: "2026-06-15",
    author: "Nexton",
    image: "/images/blog/diagnostika-webasto.jpg",
    readingTime: 5,
    keywords: ["диагностика webasto", "вебасто Полоцк"],
    faq: [
      {
        question: "Как проводится диагностика Webasto?",
        answer: "Подключаем диагностический сканер к блоку управления.",
      },
    ],
    content: `
      <h2>Диагностика Webasto в Полоцке</h2>
      <p><a href="/polotsk" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Nexton в Полоцке</a> — профессиональная диагностика.</p>
      
      <div class="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg my-4 border-l-4 border-[#1e3a5f] dark:border-[#7a9bcb]">
        <p class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb]">💡 Диагностика Webasto</p>
        <p class="text-gray-700 dark:text-gray-300">
          <a href="/polotsk/usluga/diagnostika-otopiteley" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Диагностика отопителей в Полоцке</a>
        </p>
      </div>
    `,
  },

  // ===== СТАТЬЯ 7: РЕМОНТ РАДИАТОРА ПЕЧКИ =====
  {
    id: 7,
    slug: "remont-radiatora-pochka-polotsk",
    title: "Ремонт радиатора печки в Полоцке",
    description: "Ремонт радиатора печки в Полоцке и Новополоцке.",
    category: "Ремонт радиаторов",
    categorySlug: "remont-radiatorov",
    date: "2026-06-10",
    author: "Nexton",
    image: "/images/blog/radiator.jpg",
    readingTime: 5,
    keywords: ["ремонт радиатора", "печка", "Полоцк"],
    faq: [
      {
        question: "Как понять, что радиатор печки неисправен?",
        answer: "Печка не греет, запах антифриза в салоне.",
      },
    ],
    content: `
      <h2>Ремонт радиатора печки в Полоцке</h2>
      <p><a href="/polotsk" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Nexton в Полоцке</a> — ремонт радиаторов любой сложности.</p>
      
      <div class="bg-red-50 dark:bg-gray-800 p-4 rounded-lg my-4 border-l-4 border-[#1e3a5f] dark:border-[#7a9bcb]">
        <p class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb]">⚠️ Важно!</p>
        <p class="text-gray-700 dark:text-gray-300">
          <a href="/polotsk/usluga/remont-radiatora-pechki" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Ремонт радиатора печки в Полоцке</a>
        </p>
      </div>
    `,
  },

  // ===== СТАТЬЯ 8: ЗАМЕНА РАДИАТОРА =====
  {
    id: 8,
    slug: "zamena-radiatora-ohlazhdeniya-polotsk",
    title: "Замена радиатора охлаждения: когда пора",
    description: "Замена радиатора охлаждения в Полоцке.",
    category: "Ремонт радиаторов",
    categorySlug: "remont-radiatorov",
    date: "2026-06-05",
    author: "Nexton",
    image: "/images/blog/radiator-ohlazhdeniya.jpg",
    readingTime: 6,
    keywords: ["замена радиатора", "охлаждение", "Полоцк"],
    faq: [
      {
        question: "Когда менять радиатор охлаждения?",
        answer: "Перегрев двигателя, подтеки антифриза.",
      },
    ],
    content: `
      <h2>Замена радиатора охлаждения в Полоцке</h2>
      <p><a href="/polotsk" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Nexton в Полоцке</a> — замена радиаторов с гарантией.</p>
      
      <div class="bg-red-50 dark:bg-gray-800 p-4 rounded-lg my-4 border-l-4 border-[#1e3a5f] dark:border-[#7a9bcb]">
        <p class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb]">⚠️ Срочная замена радиатора</p>
        <p class="text-gray-700 dark:text-gray-300">
          <a href="/polotsk/usluga/zamena-radiatora-ohlazhdeniya" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Замена радиатора охлаждения в Полоцке</a>
        </p>
      </div>
    `,
  },

  // ===== СТАТЬЯ 9: ПОДГОТОВКА К ЗИМЕ =====
  {
    id: 9,
    slug: "kak-podgotovit-mashinu-k-zime",
    title: "Как подготовить машину к зиме",
    description: "Полный чек-лист подготовки автомобиля к зиме.",
    category: "Советы автовладельцам",
    categorySlug: "sovety-avtovladelcam",
    date: "2026-07-25",
    author: "Nexton",
    image: "/images/blog/podgotovka-k-zime.jpg",
    readingTime: 8,
    keywords: ["подготовка к зиме", "зимнее обслуживание", "Полоцк"],
    faq: [
      {
        question: "Что проверить перед зимой?",
        answer: "Отопитель, аккумулятор, резину, систему охлаждения.",
      },
    ],
    content: `
      <h1>Как подготовить машину к зиме в Полоцке и Новополоцке</h1>
      
      <p>Подготовьте машину заранее в <a href="/polotsk" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">сервисе Nexton в Полоцке</a> или <a href="/novopolotsk" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Nexton в Новополоцке</a>.</p>

      <h2>Чек-лист подготовки</h2>

      <h3>1. Проверка отопителя и Webasto</h3>
      <ul>
        <li>Проверьте работу печки</li>
        <li>Если есть Webasto — <a href="/polotsk/usluga/diagnostika-otopiteley" class="text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">диагностика отопителей в Полоцке</a></li>
      </ul>

      <h3>2. Проверка кондиционера</h3>
      <ul>
        <li>При необходимости — <a href="/polotsk/usluga/zapravka-kondicionera" class="text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">заправка кондиционера в Полоцке</a></li>
      </ul>

      <div class="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl my-6 border-l-4 border-[#1e3a5f] dark:border-[#7a9bcb]">
        <p class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb]">💡 Нужна подготовка к зиме?</p>
        <p class="text-gray-700 dark:text-gray-300">
          Обратитесь в <a href="/polotsk" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Nexton в Полоцке</a> или <a href="/novopolotsk" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Nexton в Новополоцке</a>
        </p>
        <p class="text-gray-700 dark:text-gray-300 mt-2">
          📞 Звоните: <a href="tel:+375297115091" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb]">+375 29 711-50-91</a>
        </p>
      </div>
    `,
  },

  // ===== СТАТЬЯ 10: ЗАПОТЕВАЮТ СТЕКЛА =====
  {
    id: 10,
    slug: "pochemu-poteyut-stekla-v-mashine",
    title: "Почему запотевают стекла в машине",
    description: "Причины запотевания стекол и как избавиться.",
    category: "Советы автовладельцам",
    categorySlug: "sovety-avtovladelcam",
    date: "2026-07-01",
    author: "Nexton",
    image: "/images/blog/zapotevanie-stekol.jpg",
    readingTime: 4,
    keywords: ["запотевают стекла", "конденсат", "Полоцк"],
    faq: [
      {
        question: "Почему стекла потеют?",
        answer: "Забитый салонный фильтр или влага в салоне.",
      },
    ],
    content: `
      <h2>Почему запотевают стекла?</h2>
      <p>В <a href="/polotsk" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Nexton в Полоцке</a> мы поможем устранить причину.</p>

      <h2>Основные причины:</h2>
      <ul>
        <li>🌫️ Забитый салонный фильтр</li>
        <li>💧 Влажность в салоне</li>
        <li>🔄 Неисправность климат-контроля</li>
      </ul>

      <div class="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg my-4 border-l-4 border-[#1e3a5f] dark:border-[#7a9bcb]">
        <p class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb]">🔧 Нужна помощь?</p>
        <p class="text-gray-700 dark:text-gray-300">
          <a href="/polotsk" class="font-semibold text-[#1e3a5f] dark:text-[#7a9bcb] underline hover:no-underline">Nexton в Полоцке</a> — диагностика и ремонт.
        </p>
      </div>
    `,
  },
];
