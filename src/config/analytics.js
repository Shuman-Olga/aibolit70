/** * Конфигурация аналитики */ /** * Яндекс Метрика */

export const YANDEX_METRIKA_ID = 92081905;

/** * Google Analytics 4 */

export const GOOGLE_ANALYTICS_ID = "G-BW69R82Z9V";

/** * Не запускаем аналитику во время react-snap. */

export function isReactSnap() {
  if (typeof navigator === "undefined") {
    return false;
  }
  return /ReactSnap/i.test(navigator.userAgent);
}

/** * Инициализация Яндекс Метрики. */

export function initYandexMetrika() {
  if (typeof window === "undefined" || isReactSnap() || !YANDEX_METRIKA_ID) {
    return;
  }
  if (window.__YANDEX_METRIKA_INITIALIZED__) {
    return;
  }
  window.__YANDEX_METRIKA_INITIALIZED__ = true;
  (function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * new Date();
    k = e.createElement(t);
    a = e.getElementsByTagName(t)[0];
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  window.ym(YANDEX_METRIKA_ID, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });
}

/** * Инициализация Google Analytics 4. */

export function initGoogleAnalytics() {
  if (typeof window === "undefined" || isReactSnap() || !GOOGLE_ANALYTICS_ID) {
    return;
  }
  if (window.__GOOGLE_ANALYTICS_INITIALIZED__) {
    return;
  }
  window.__GOOGLE_ANALYTICS_INITIALIZED__ = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ANALYTICS_ID);
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
  document.head.appendChild(script);
}

/** * Инициализация всей аналитики. */

export function initAnalytics() {
  if (typeof window === "undefined" || isReactSnap()) {
    return;
  }
  initYandexMetrika();
  initGoogleAnalytics();
}
