import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { useState } from "react";
import { Router } from "next/router";
import Loader from "@/components/loader";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });

  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  if (loading) {
    return <Loader type="bars" color="black" />;
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
