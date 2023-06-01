import ResponsiveAppBar from "@/component/Header/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ResponsiveAppBar />
      <Component {...pageProps} />
    </div>
  );
}
