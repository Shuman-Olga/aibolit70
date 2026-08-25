const isReactSnap =
  typeof navigator !== "undefined" && /ReactSnap/i.test(navigator.userAgent);

export default isReactSnap;
