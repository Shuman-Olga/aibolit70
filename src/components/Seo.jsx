import React from "react";
import { Helmet } from "react-helmet";
import { useLocation, useMatches } from "react-router-dom";

import {
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_LOCALE,
} from "../config/site";

import {
  getCanonicalUrl,
  getSeoImage,
  getOrganizationSchema,
} from "../utilits/seo";

const toStringValue = (value, fallback = "") => {
  if (typeof value === "string") {
    return value;
  }

  if (value === null || value === undefined) {
    return fallback;
  }

  return String(value);
};

export default function Seo() {
  const matches = useMatches();
  const location = useLocation();

  const seo = [...matches].reverse().find((match) => match.handle?.seo)
    ?.handle?.seo;

  const title = toStringValue(seo?.title, SITE_TITLE);

  const description = toStringValue(seo?.description, SITE_DESCRIPTION);

  const keywords = toStringValue(seo?.keywords);

  const robots = toStringValue(seo?.robots, "index, follow");

  const type = toStringValue(seo?.type, "website");

  const canonical = getCanonicalUrl(location.pathname);

  const image = getSeoImage(toStringValue(seo?.image));

  /*
   * JSON-LD
   */
  const schema = seo?.schema || getOrganizationSchema();

  const schemaJson = schema ? JSON.stringify(schema) : null;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta name="robots" content={robots} />

      <link rel="canonical" href={canonical} />

      {/* Open Graph */}

      <meta property="og:type" content={type} />

      <meta property="og:site_name" content={toStringValue(SITE_NAME)} />

      <meta property="og:locale" content={toStringValue(SITE_LOCALE)} />

      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:url" content={canonical} />

      <meta property="og:image" content={image} />

      {seo?.imageWidth !== undefined && (
        <meta
          property="og:image:width"
          content={toStringValue(seo.imageWidth)}
        />
      )}

      {seo?.imageHeight !== undefined && (
        <meta
          property="og:image:height"
          content={toStringValue(seo.imageHeight)}
        />
      )}

      {seo?.imageType && (
        <meta property="og:image:type" content={toStringValue(seo.imageType)} />
      )}

      {/* Twitter */}

      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={image} />

      {/* Keywords */}

      {keywords && <meta name="keywords" content={keywords} />}

      {/* JSON-LD */}

      {schemaJson && <script type="application/ld+json">{schemaJson}</script>}
    </Helmet>
  );
}
