import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <div>
        <Head>
          <title>home page</title>
        </Head>
      </div>
      <main>
        <div className="text-2xl capitalize">Home Page</div>
      </main>
    </>
  );
};

export default Home;
