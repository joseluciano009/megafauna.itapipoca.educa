import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description?: string;
  image?: string;
  path?: string;
};

export function SEO({ title, description, image, path }: Props) {
  const url = path ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}