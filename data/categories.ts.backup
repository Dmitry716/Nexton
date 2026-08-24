export const categories = [
  { id: "avtokondicionery", name: "Автокондиционеры" },
  { id: "otopiteli", name: "Автономные отопители" },
  { id: "radiatory", name: "Ремонт радиаторов" },
  { id: "svarka", name: "Аргонная сварка" },
  {
    id: "gruzovye",
    name: "Ремонт радиаторов и топливных баков для грузовиков",
  },
  { id: "plastik", name: "Ремонт автопластика" },
  { id: "pnevmosistemy_legkovyh", name: "Пневмосистемы легковых авто" },
  { id: "kuzovnye", name: "Кузовной ремонт" },
  { id: "kitayskie_avto", name: "Ремонт китайских автомобилей" },
  { id: "diagnostika_podveski", name: "Диагностика подвески" },
];

/** Отдельные посадочные страницы категорий (остальные — якоря на странице услуг). */
const CATEGORY_LANDING_PATHS: Record<string, string> = {
  kuzovnye: "kuzovnoy-remont",
  kitayskie_avto: "remont-kitayskih-avto",
};

export function hasCategoryLandingPage(categoryId: string): boolean {
  return Boolean(CATEGORY_LANDING_PATHS[categoryId]);
}

export function getCategoryPageHref(
  categoryId: string,
  city = "polotsk",
): string {
  const landingPath = CATEGORY_LANDING_PATHS[categoryId];
  if (landingPath) {
    return `/${city}/${landingPath}`;
  }
  return `#${categoryId}`;
}
