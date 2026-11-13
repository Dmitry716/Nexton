
interface Step {
  title: string;
  text: string;
}

interface Props {
  steps: Step[];
  serviceName: string;
}

export default function DetailingServiceSteps({ steps, serviceName }: Props) {
  return (
    <section aria-labelledby="steps-title" className="mb-16">
      <h2
        id="steps-title"
        className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-6 text-center"
      >
        Как проходит {serviceName.toLowerCase()}
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className="relative p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-[#1e3a5f] dark:hover:border-[#7a9bcb] hover:shadow-md transition-all"
          >
            <span
              aria-hidden="true"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1e3a5f]/10 dark:bg-[#7a9bcb]/15 text-[#1e3a5f] dark:text-[#7a9bcb] font-bold mb-3"
            >
              {i + 1}
            </span>
            <h3 className="text-base font-bold text-black dark:text-white mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
