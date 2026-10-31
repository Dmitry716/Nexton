import type { CurrencyCode } from "@/data/cities";

export type ExchangeRates = {
  /** BYN за 1 EUR */
  eur: { rate: number; scale: number };
  /** BYN за scale единиц RUB (обычно 100) */
  rub: { rate: number; scale: number };
  date: string; // YYYY-MM-DD
  source: "nbrb" | "fallback";
};

const FALLBACK_RATES: ExchangeRates = {
  eur: { rate: 3.28, scale: 1 },
  rub: { rate: 3.66, scale: 100 },
  date: "2026-10-31",
  source: "fallback",
};

type NbrbRateResponse = {
  Cur_Abbreviation: string;
  Cur_Scale: number;
  Cur_OfficialRate: number;
  Date: string;
};

async function fetchNbrbRate(code: "EUR" | "RUB"): Promise<NbrbRateResponse> {
  const res = await fetch(
    `https://api.nbrb.by/exrates/rates/${code}?parammode=2`,
    {
      next: { revalidate: 86400 },
    },
  );
  if (!res.ok) {
    throw new Error(`NBRB ${code}: HTTP ${res.status}`);
  }
  return res.json();
}

function toDateOnly(iso: string): string {
  return iso.slice(0, 10);
}

export async function getExchangeRates(): Promise<ExchangeRates> {
  try {
    const [eur, rub] = await Promise.all([
      fetchNbrbRate("EUR"),
      fetchNbrbRate("RUB"),
    ]);
    return {
      eur: { rate: eur.Cur_OfficialRate, scale: eur.Cur_Scale || 1 },
      rub: { rate: rub.Cur_OfficialRate, scale: rub.Cur_Scale || 100 },
      date: toDateOnly(eur.Date || rub.Date),
      source: "nbrb",
    };
  } catch {
    return FALLBACK_RATES;
  }
}

/** BYN → сумма в целевой валюте (без округления витрины). */
export function convertFromByn(
  amountByn: number,
  currency: CurrencyCode,
  rates: ExchangeRates,
): number {
  if (currency === "BYN") return amountByn;
  if (currency === "EUR") {
    return (amountByn * rates.eur.scale) / rates.eur.rate;
  }
  return (amountByn * rates.rub.scale) / rates.rub.rate;
}

/** Округление вверх: RUB до 10 ₽, EUR до 1 €, BYN без изменений (как в прайсе). */
export function roundDisplayAmount(
  amount: number,
  currency: CurrencyCode,
): number {
  if (currency === "RUB") return Math.ceil(amount / 10) * 10;
  if (currency === "EUR") return Math.ceil(amount);
  return amount;
}

function formatNumber(n: number, currency: CurrencyCode): string {
  if (currency === "BYN") {
    return Number.isInteger(n)
      ? String(n)
      : n.toLocaleString("ru-RU", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        });
  }
  return Math.round(n).toLocaleString("ru-RU");
}

export function currencySuffix(currency: CurrencyCode): string {
  if (currency === "RUB") return "₽";
  if (currency === "EUR") return "€";
  return "Br";
}

/** Сумма без «от»: `15 000 ₽` / `120 €` / `50 Br` */
export function formatPriceAmount(
  amountByn: number,
  currency: CurrencyCode,
  rates: ExchangeRates,
): string {
  const converted = roundDisplayAmount(
    convertFromByn(amountByn, currency, rates),
    currency,
  );
  return `${formatNumber(converted, currency)} ${currencySuffix(currency)}`;
}

/** С «от»: `от 15 000 ₽` */
export function formatPrice(
  amountByn: number,
  currency: CurrencyCode,
  rates: ExchangeRates,
): string {
  return `от ${formatPriceAmount(amountByn, currency, rates)}`;
}

export function formatRatesDate(date: string): string {
  const [y, m, d] = date.split("-");
  if (!y || !m || !d) return date;
  return `${d}.${m}.${y}`;
}

export function ratesDisclaimer(
  rates: ExchangeRates,
  currency: CurrencyCode,
): string {
  if (currency === "BYN") {
    return "Цены в белорусских рублях (BYN).";
  }
  const curLabel = currency === "RUB" ? "рублях РФ" : "евро";
  return `Эквивалент в ${curLabel} по курсу НБРБ на ${formatRatesDate(rates.date)}. Оплата и точная смета — в BYN / по согласованию.`;
}

/**
 * Подставляет {{price:N}} и конвертирует legacy «N Br» / «от N Br» / «от N до M Br».
 */
export function localizePricesInHtml(
  html: string,
  currency: CurrencyCode,
  rates: ExchangeRates,
): string {
  let out = html.replace(/\{\{price:(\d+(?:[.,]\d+)?)\}\}/g, (_, raw: string) => {
    const n = parseFloat(raw.replace(",", "."));
    return formatPriceAmount(n, currency, rates);
  });

  out = out.replace(
    /от\s+(\d+(?:[.,]\d+)?)\s+до\s+(\d+(?:[.,]\d+)?)\s*Br/gi,
    (_m, a: string, b: string) => {
      const from = formatPriceAmount(
        parseFloat(a.replace(",", ".")),
        currency,
        rates,
      );
      const to = formatPriceAmount(
        parseFloat(b.replace(",", ".")),
        currency,
        rates,
      );
      return `от ${from} до ${to}`;
    },
  );

  out = out.replace(
    /от\s+(\d+(?:[.,]\d+)?)\s*Br/gi,
    (_m, a: string) =>
      `от ${formatPriceAmount(parseFloat(a.replace(",", ".")), currency, rates)}`,
  );

  out = out.replace(
    /(\+?\s*)(\d+(?:[.,]\d+)?)\s*Br\b/gi,
    (_m, prefix: string, a: string) =>
      `${prefix}${formatPriceAmount(parseFloat(a.replace(",", ".")), currency, rates)}`,
  );

  if (currency !== "BYN") {
    out = out.replace(
      /Цены в белорусских рублях \(BYN\)\.?/gi,
      ratesDisclaimer(rates, currency),
    );
    out = out.replace(
      /Цены в BYN\.?/gi,
      ratesDisclaimer(rates, currency),
    );
    out = out.replace(
      /цены в BYN/gi,
      `цены в ${currency === "RUB" ? "рублях РФ" : "евро"} (эквивалент НБРБ)`,
    );
  }

  return out;
}
