import { Helmet } from "react-helmet";
import { dataSeo } from "../data/Seo/dataSeoPage";

export default function SeoPage(props) {
  const data = dataSeo.find((item) => item.namePage === `${props.page}`);
  if (!data) return null;
  return (
    <Helmet>
      <title>{data.title}</title>
      <meta property="og:locale" content="ru_RU" />
      <meta name="robots" content="index, follow" />
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords} />
      <link rel="canonical" href={data.urlname} />
      <meta property="og:type" content="website" />
      <meta property="og:image" ontent={`/assets/img/${data.img}`}></meta>
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="350" />
      <meta property="og:image:height" content="350" />
      <meta property="og:site_name" content="Айболит" />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:url" content={data.urlname} />
    </Helmet>
  );
}
