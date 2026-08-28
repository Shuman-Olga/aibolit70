import React from "react";

const images = require.context(
  "../../assets/img",
  true,
  /\.(png|jpe?g|webp|avif)$/i,
);

function getImage(baseName, extension) {
  try {
    return images(`./${baseName}.${extension}`);
  } catch {
    return null;
  }
}

export default function OptimizedImage({
  src,
  alt = "",
  title,
  width,
  height,
  loading = "lazy",
  className,
  ...props
}) {
  if (!src) {
    return null;
  }

  const match = src.match(/^(.+)\.(png|jpe?g)$/i);

  if (!match) {
    console.warn(
      `OptimizedImage: unsupported image source "${src}". ` +
        `Expected .jpg, .jpeg or .png`,
    );
    return null;
  }

  const [, baseName, originalExtension] = match;

  const original = getImage(baseName, originalExtension);

  if (!original) {
    console.warn(`OptimizedImage: image not found "${src}"`);
    return null;
  }

  const avif = getImage(baseName, "avif");
  const webp = getImage(baseName, "webp");

  return (
    <picture>
      {avif && <source srcSet={avif} type="image/avif" />}
      {webp && <source srcSet={webp} type="image/webp" />}

      <img
        src={original}
        alt={alt}
        title={title}
        loading={loading}
        // decoding="async"
        // fetchPriority={loading === "eager" ? "high" : "auto"}
        width={width}
        height={height}
        className={className}
        {...props}
      />
    </picture>
  );
}
