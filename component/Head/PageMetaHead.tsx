import React from "react";
import Head from "next/head";
import { MetaHead } from "@/types/Movie";

export default function PageMetaHead({ title, keywords, description }: MetaHead) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://cdn-icons-png.flaticon.com/512/3658/3658959.png"
      />
      <meta charSet="utf-8" />
    </Head>
  );
}

PageMetaHead.defaultProps = {
  title: "Movie App",
  keywords: "movie",
  Description: "Movie app for learning next.js",
};
