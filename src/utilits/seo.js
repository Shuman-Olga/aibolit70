import {
  SITE_URL,
  SITE_NAME,
  SITE_PHONE,
  SITE_ADDRESS,
  SITE_SOCIAL,
  SITE_DEFAULT_IMAGE,
} from "../config/site";

/** * Преобразует относительный URL * в абсолютный. * * /assets/img/aibolit.png * ↓ * https://aibolit70.ru/assets/img/aibolit.png */

export function toAbsoluteUrl(url) {
  if (!url) {
    return SITE_URL;
  }
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

/** * Приводит pathname к единому виду. * * / * /o-nas * /o-nas/ * * Результат: * * / * /o-nas/ */

export function normalizePath(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }
  return `/${pathname.replace(/^\/+|\/+$/g, "")}/`;
}
/** * Формирует canonical. */

export function getCanonicalUrl(pathname) {
  return toAbsoluteUrl(normalizePath(pathname));
}

/** * Формирует абсолютный URL изображения. */

export function getSeoImage(image) {
  return toAbsoluteUrl(image || SITE_DEFAULT_IMAGE);
}

/** * Общая Schema.org разметка сайта. * * Используется как базовая схема. * Для конкретной страницы route может * передать собственную schema. */

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: SITE_NAME,
    description: "Детская медицинская служба «Айболит» в Томске.",
    url: SITE_URL,
    telephone: SITE_PHONE,
    image: toAbsoluteUrl(SITE_DEFAULT_IMAGE),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_ADDRESS.street,
      addressLocality: SITE_ADDRESS.city,
      addressCountry: SITE_ADDRESS.country,
    },
    sameAs: SITE_SOCIAL,
  };
}
