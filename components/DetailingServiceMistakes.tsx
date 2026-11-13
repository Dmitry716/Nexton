import { AlertTriangle } from "lucide-react";

interface Mistake {
  title: string;
  text: string;
}

interface Props {
  mistakes: Mistake[];
  serviceName: string;
}

export default function DetailingServiceMistakes({
  mistakes,
  serviceName,
}: Props) {
  return (
    <section aria-labelledby="mistakes-title" className="mb-16">
      <div className="text-center mb-8">
        <h2
          id="mistakes-title"
          className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-3"
        >
          Частые ошибки при {serviceName.toLowerCase()}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Что чаще всего идёт не так — и как этого избежать.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {mistakes.map((mistake, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-5 rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20"
          >
            <span
              aria-hidden="true"
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 shrink-0"
            >
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-black dark:text-white mb-1">
                {mistake.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {mistake.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
