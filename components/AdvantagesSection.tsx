const advantages = [
  {
    title: "Опыт 15+ лет",
    description: "Более 15 лет успешной работы",
  },
  {
    title: "Профоборудование",
    description: "Современное диагностическое оборудование",
  },
  {
    title: "Гарантия",
    description: "Гарантия на все виды работ",
  },
];

export default function AdvantagesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
          Почему выбирают нас
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="text-center p-6 border-2 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                {advantage.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}