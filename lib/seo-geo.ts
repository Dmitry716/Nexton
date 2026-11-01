/** GEO/SEO helpers for city landings and service pages. */

export function isTwinCity(citySlug: string): boolean {
  return citySlug === "polotsk" || citySlug === "novopolotsk";
}

/** «Полоцке и Новополоцке» for home market; otherwise city prepositional. */
export function geoPhrase(citySlug: string, cityPrep: string): string {
  return isTwinCity(citySlug) ? "Полоцке и Новополоцке" : cityPrep;
}

export function replaceCityInText(
  text: string,
  cityName: string,
  cityPrep: string,
  citySlug?: string,
): string {
  if (citySlug && isTwinCity(citySlug)) {
    return text;
  }
  return text
    .replace(/Полоцке и Новополоцке/g, cityPrep)
    .replace(/Полоцк и Новополоцк/g, cityName)
    .replace(/Полоцке/g, cityPrep)
    .replace(/Полоцк/g, cityName)
    .replace(/Новополоцке/g, cityPrep)
    .replace(/Новополоцк/g, cityName);
}

/** Keywords for both twin cities when relevant. */
export function twinCityKeywords(
  citySlug: string,
  phrases: string[],
): string[] {
  const out: string[] = [];
  for (const p of phrases) {
    if (isTwinCity(citySlug)) {
      out.push(`${p} Полоцк`, `${p} Новополоцк`);
    } else {
      out.push(p);
    }
  }
  return [...new Set(out)];
}

export type ServiceSeoBlock = {
  title: string;
  description: string;
  h1: string;
  keywords: string[];
};

/**
 * Priority commercial queries from GSC → dedicated title/H1/description.
 * `geo` = twin phrase for Полоцк/Новополоцк; `cityPrep` = single city (for local queries).
 */
export function serviceSeoForSlug(
  slug: string,
  geo: string,
  citySlug: string,
  cityPrep?: string,
): ServiceSeoBlock | null {
  // Local-city queries (вибростенд минск / полоцк) need single-city phrasing.
  const local = cityPrep || geo;

  const map: Record<string, Omit<ServiceSeoBlock, "keywords"> & { kw: string[] }> =
    {
      "zapravka-kondicionera": {
        title: `Заправка автокондиционера в ${geo} — от 50 Br, цена`,
        description: `Сколько стоит заправить автокондиционер в машине в ${geo}? Легковые от 50 Br, внедорожники от 100 Br. Вакуум, фреон, масло, УФ. Nexton, ул. Строительная 21в/3. +375 (29) 711-50-91`,
        h1: `Заправка автокондиционера в ${geo}`,
        kw: [
          "заправка автокондиционера",
          "заправка автокондиционера Полоцк",
          "заправка автокондиционера Новополоцк",
          "заправить автокондиционер",
          "сколько стоит заправить автокондиционер",
          "стоимость заправки автокондиционера",
          "заправка автокондиционера цена",
          "перезаправка автокондиционера",
        ],
      },
      "remont-kondicionera-utechki": {
        title: `Ремонт автокондиционеров в ${geo} — поиск утечек фреона`,
        description: `Ремонт автокондиционеров в ${geo}: поиск утечки фреона, пайка трубок, уплотнители, осушитель. Гарантия до 6 месяцев. Nexton. +375 (29) 711-50-91`,
        h1: `Ремонт автокондиционеров в ${geo}`,
        kw: [
          "ремонт автокондиционеров",
          "ремонт автокондиционера",
          "утечка фреона автокондиционер",
          "поиск утечки фреона в автомобиле",
        ],
      },
      "payka-trubok-kondicionera": {
        title: `Пайка трубок автокондиционера в ${geo}`,
        description: `Пайка алюминиевых и медных трубок автокондиционера аргоном в ${geo}. Восстановление герметичности. Nexton. +375 (29) 711-50-91`,
        h1: `Пайка трубок автокондиционера в ${geo}`,
        kw: ["пайка трубок автокондиционера", "ремонт трубок автокондиционера"],
      },
      "zamena-kompressora": {
        title: `Замена компрессора автокондиционера в ${geo}`,
        description: `Замена компрессора автокондиционера с промывкой системы в ${geo}. Гарантия до 6 месяцев. Nexton. +375 (29) 711-50-91`,
        h1: `Замена компрессора автокондиционера в ${geo}`,
        kw: [
          "замена компрессора автокондиционера",
          "компрессор автокондиционера",
        ],
      },
      "remont-otopiteley": {
        title: `Ремонт вебасто и автономных отопителей в ${geo}`,
        description: `Ремонт вебасто (Webasto), Eberspacher, Планар, Бинар в ${geo}: диагностика, свечи, камера, блоки. Гарантия до 6 месяцев. Nexton. +375 (29) 711-50-91`,
        h1: `Ремонт вебасто и автономных отопителей в ${geo}`,
        kw: [
          "ремонт вебасто",
          "ремонт Webasto",
          "ремонт автономных отопителей",
          "ремонт eberspacher",
          "вебасто",
        ],
      },
      "diagnostika-otopiteley": {
        title: `Диагностика вебасто в ${geo} — Webasto, Eberspacher`,
        description: `Компьютерная диагностика автономных отопителей Webasto, Eberspacher, Планар в ${geo}. Nexton. +375 (29) 711-50-91`,
        h1: `Диагностика вебасто в ${geo}`,
        kw: [
          "диагностика вебасто",
          "диагностика автономного отопителя",
          "диагностика eberspacher",
        ],
      },
      "diagnostika-podveski-vibrostend": {
        title: `Вибростенд в ${local} — диагностика подвески от 70 Br`,
        description: `Вибростенд в ${local}: диагностика подвески и амортизаторов за 15–20 мин, отчёт. Легковые 70 Br, кроссоверы 90 Br. Запись: +375 (29) 711-50-91. Nexton, Полоцк`,
        h1: `Вибростенд в ${local} — диагностика подвески`,
        kw: [
          "вибростенд",
          "диагностика подвески",
          "диагностика подвески на вибростенде",
          "проверка подвески на вибростенде",
          "вибростенд для диагностики подвески",
          "диагностика подвески цена",
        ],
      },
      "remont-radiatora-ohlazhdeniya": {
        title: `Ремонт радиатора охлаждения в ${geo}`,
        description: `Ремонт радиаторов охлаждения пайкой и аргоном в ${geo}. Легковые и грузовые. Nexton. +375 (29) 711-50-91`,
        h1: `Ремонт радиатора охлаждения в ${geo}`,
        kw: [
          "ремонт радиатора",
          "ремонт радиаторов",
          "ремонт радиатора охлаждения",
          "пайка радиатора",
        ],
      },
      "remont-radiatora-pechki": {
        title: `Ремонт радиатора печки в ${geo}`,
        description: `Ремонт радиатора отопителя (печки) пайкой и аргоном в ${geo}. Nexton. +375 (29) 711-50-91`,
        h1: `Ремонт радиатора печки в ${geo}`,
        kw: ["ремонт радиатора печки", "радиатор отопителя", "промывка радиатора печки"],
      },
      "promyvka-radiatorov": {
        title: `Промывка радиаторов в ${geo}`,
        description: `Промывка радиатора охлаждения и печки в ${geo}. Nexton. +375 (29) 711-50-91`,
        h1: `Промывка радиаторов в ${geo}`,
        kw: [
          "промывка радиатора",
          "промывка радиаторов",
          "чистка радиатора",
          "промывка радиатора печки",
        ],
      },
      "pokraska-kuzova": {
        title: `Покраска авто в ${geo} — локальная и полная`,
        description: `Покраска авто в ${geo}: подбор цвета, локальная и полная покраска кузова. Гарантия на ЛКП. Nexton. +375 (29) 711-50-91`,
        h1: `Покраска авто в ${geo}`,
        kw: [
          "покраска авто",
          "покраска кузова",
          "покраска автомобиля",
          "локальная покраска",
        ],
      },
      "remont-bampera": {
        title: `Ремонт бампера в ${geo} — сварка и покраска`,
        description: `Ремонт бамперов в ${geo}: пластиковая сварка, крепления, шпаклёвка, покраска. Nexton. +375 (29) 711-50-91`,
        h1: `Ремонт бампера в ${geo}`,
        kw: ["ремонт бампера", "ремонт бамперов", "сварка бампера", "покраска бампера"],
      },
      "bespokrasochnoe-udalenie-vmyatin": {
        title: `Беспокрасочное удаление вмятин (PDR) в ${geo}`,
        description: `PDR — беспокрасочное удаление вмятин в ${geo}. Nexton. +375 (29) 711-50-91`,
        h1: `Беспокрасочное удаление вмятин в ${geo}`,
        kw: [
          "беспокрасочное удаление вмятин",
          "PDR",
          "удаление вмятин без покраски",
        ],
      },
      "vosstanovlenie-geometrii-kuzova": {
        title: `Восстановление геометрии кузова в ${geo}`,
        description: `Стапель, восстановление геометрии кузова после ДТП в ${geo}. Nexton. +375 (29) 711-50-91`,
        h1: `Восстановление геометрии кузова в ${geo}`,
        kw: ["восстановление геометрии кузова", "стапель", "рихтовка кузова"],
      },
    };

  const block = map[slug];
  if (!block) return null;
  return {
    title: block.title,
    description: block.description,
    h1: block.h1,
    keywords: twinCityKeywords(citySlug, block.kw),
  };
}

export function landingKeywords(
  citySlug: string,
  phrases: string[],
): string[] {
  return twinCityKeywords(citySlug, phrases);
}
