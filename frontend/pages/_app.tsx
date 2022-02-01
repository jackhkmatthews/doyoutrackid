import type { AppProps } from "next/app";
import "normalize.css";
import Script from "next/script";
import Head from "next/head";

import Layout from "../components/Layout/Layout";
import { ElevenEleven } from "../contexts/elevenEleven";
import { useIsElevenEleven } from "../hooks/useIsElevenEleven";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const [isElevenEleven, setIsElevenEleven] = useIsElevenEleven();

  return (
    <ElevenEleven.Provider value={{ isElevenEleven, setIsElevenEleven }}>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
      </Head>
      <Script
        strategy="beforeInteractive"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-318X5P6DZZ"
      />
      <Script id="gtag">
        {`window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());
          
          gtag("config", "G-318X5P6DZZ");`}
      </Script>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ElevenEleven.Provider>
  );
}

export default MyApp;
