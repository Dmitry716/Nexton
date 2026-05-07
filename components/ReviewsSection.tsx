"use client";

import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  id: number;
  name: string;
  car?: string;
  text: string;
  rating: number;
  date: string;
  service?: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Алексей",
    car: "BMW X5",
    text: "Отличный сервис! Заправили кондиционер, теперь дует ледяным. Спасибо мастерам! Приехал с жалобой на тёплый воздух — за час всё сделали. Давление в норме, фреон заправили, добавили краситель. Результатом очень доволен!",
    rating: 5,
    date: "15.04.2026",
    service: "Заправка автокондиционера",
  },
  {
    id: 2,
    name: "Михаил",
    car: "Volkswagen Tiguan",
    text: "Кондиционер перестал охлаждать. Оказалось — микротрещина в трубке. Мастер быстро нашёл утечку с помощью течеискателя, запаяли на месте. Месяц уже — всё работает отлично. Цена адекватная.",
    rating: 5,
    date: "10.04.2026",
    service: "Ремонт трубок кондиционера",
  },
  {
    id: 3,
    name: "Ольга",
    car: "Hyundai Solaris",
    text: "Делали бактериальную очистку кондиционера. Раньше при включении стоял ужасный запах сырости. После обработки пеной — запах пропал полностью. В салоне стало приятно дышать. Рекомендую делать раз в год!",
    rating: 5,
    date: "25.03.2026",
    service: "Бактериальная очистка",
  },
  {
    id: 4,
    name: "Игорь",
    car: "Mercedes-Benz E-Class",
    text: "Задний контур кондиционера перестал работать — течь металлических трубок. Ребята заменили трубки на качественные шланги. Теперь задние пассажиры тоже с комфортом. Спасибо за оперативность!",
    rating: 5,
    date: "18.03.2026",
    service: "Замена заднего контура на шланги",
  },
  {
    id: 5,
    name: "Екатерина",
    car: "Kia Sportage",
    text: "Ремонтировала Webasto перед зимой. Отопитель перестал запускаться — заменили свечу накаливания и почистили камеру сгорания. Всё сделали быстро и качественно. Зимой в машине тепло, даже двигатель не прогревая. Рекомендую!",
    rating: 5,
    date: "10.03.2026",
    service: "Ремонт Webasto",
  },
  {
    id: 6,
    name: "Сергей",
    car: "Ford Transit",
    text: "На микроавтобусе отказал автономный отопитель Планар. Привёз — продиагностировали, нашли ошибку в блоке управления. Восстановили плату за разумные деньги. Доволен, буду обращаться ещё.",
    rating: 5,
    date: "05.03.2026",
    service: "Ремонт блоков управления отопителей",
  },
  {
    id: 7,
    name: "Дмитрий",
    car: "Volkswagen Passat B6",
    text: "Поменяли радиатор охлаждения двигателя. Нашёл течь антифриза, после диагностики выяснилось — радиатор пора менять. Подобрали качественный аналог, установили, залили свежий антифриз. Гарантию дали. Третий месяц полёт отличный!",
    rating: 5,
    date: "01.03.2026",
    service: "Замена радиатора охлаждения",
  },
  {
    id: 8,
    name: "Андрей",
    car: "Audi A6",
    text: "Заменили радиатор кондиционера — старый пробило камнем. Мастер предупредил, что нужно менять ещё осушитель и заправить всё заново. Цену озвучили до работы. Сделали аккуратно, кондиционер теперь работает как новый.",
    rating: 5,
    date: "20.02.2026",
    service: "Замена конденсатора кондиционера",
  },
  {
    id: 9,
    name: "Сергей",
    car: "Toyota Camry",
    text: "Попал в ДТП — повело кузов. Делали восстановление геометрии кузова на стапеле. Мастера вытянули всё в заводские параметры. Двери теперь закрываются идеально, машину не ведёт. Спасибо за профессионализм!",
    rating: 5,
    date: "15.02.2026",
    service: "Восстановление геометрии кузова",
  },
  {
    id: 10,
    name: "Владимир",
    car: "Tesla Model 3",
    text: "Сделали PDR-рихтовку двери. Была глубокая вмятина от чужой двери на парковке. Мастер восстановил форму без покраски — просто колдунство какое-то! Краска целая, вмятины как не бывало. Очень доволен!",
    rating: 5,
    date: "28.01.2026",
    service: "PDR рихтовка",
  },
  {
    id: 11,
    name: "Павел",
    car: "Nissan Patrol",
    text: "Лопнул поддон картера — аргонщик сварил алюминий на месте. Шов получился аккуратный, герметичный. Цена за сварку справедливая. Гораздо дешевле нового поддона.",
    rating: 5,
    date: "10.01.2026",
    service: "Аргонная сварка алюминия",
  },
  {
    id: 12,
    name: "Иван",
    car: "Land Rover Discovery 3",
    text: "Пневмоподвеска просела. Приехал на диагностику — управляющий клапан барахлил и осушитель забился. Ребята всё отремонтировали, заменили расходники. Система работает как новая. Отдельное спасибо за подробную консультацию!",
    rating: 5,
    date: "05.01.2026",
    service: "Ремонт пневмоподвески",
  },
  {
    id: 13,
    name: "Наталья",
    car: "Renault Kaptur",
    text: "Поменяли салонный фильтр и сделали полную бактериальную очистку системы кондиционирования. Запах плесени исчез, кондиционер перестал сушить глаза. Цена приятно удивила. Буду рекомендовать друзьям!",
    rating: 5,
    date: "20.12.2025",
    service: "Бактериальная очистка",
  },
  {
    id: 14,
    name: "Артём",
    car: "Mazda CX-5",
    text: "Делал промывку системы кондиционера после замены компрессора на другом сервисе. Оказалось, старый компрессор рассыпался, и металлическая стружка осталась в системе. Промыли специальной станцией, заменили осушитель. Компрессор дольше проживёт. Спасибо за качественный подход!",
    rating: 5,
    date: "12.12.2025",
    service: "Промывка системы кондиционера",
  },
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayInterval.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev + visibleCount >= reviews.length) return 0;
        return prev + 1;
      });
    }, 5000);

    return () => {
      if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
    };
  }, [visibleCount, isAutoPlaying]);

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const nextSlide = () => {
    stopAutoPlay();
    if (currentIndex + visibleCount < reviews.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    stopAutoPlay();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(reviews.length - visibleCount);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const totalDots = Math.ceil(reviews.length / visibleCount);
  const currentDot = Math.floor(currentIndex / visibleCount);

  return (
    <section
      className="py-20 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800"
      aria-labelledby="reviews-title"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
              5.0 из 5 · 50+ отзывов
            </span>
          </div>
          <h2
            id="reviews-title"
            className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4"
          >
            Отзывы наших клиентов
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Реальное мнение о нашей работе в Полоцке и Новополоцке
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            💬 Свайпайте влево/вправо на мобильном, чтобы листать отзывы
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews
              .slice(currentIndex, currentIndex + visibleCount)
              .map((review) => (
                <div
                  key={review.id}
                  className="card p-6 bg-white dark:bg-black h-full animate-fade-in hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 italic">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="mt-auto">
                    <p className="font-bold text-black dark:text-white">
                      {review.name}
                    </p>
                    {review.car && (
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {review.car}
                      </p>
                    )}
                    {review.service && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        🛠️ {review.service}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                      {review.date}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {reviews.length > visibleCount && (
            <div className="flex justify-center gap-6 mt-8">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all duration-300 cursor-pointer"
                aria-label="Предыдущие отзывы"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalDots }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      stopAutoPlay();
                      setCurrentIndex(idx * visibleCount);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentDot
                        ? "w-8 bg-[#1e3a5f] dark:bg-[#7a9bcb]"
                        : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                    }`}
                    aria-label={`Перейти к группе отзывов ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-3 rounded-full border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] transition-all duration-300 cursor-pointer"
                aria-label="Следующие отзывы"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
