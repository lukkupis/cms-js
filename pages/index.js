import initialCheckAuth from 'helpers/initialCheckAuth';

import Head from 'next/head';
import Header from 'components/organisms/Header/Header';

function Home(props) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <div className="container mt-5">Site under construction.</div>
    </>
  );
}

Home.getInitialProps = async ({ req, query, store, isServer }) => {
  initialCheckAuth(req, store, false);

  return { isServer };
};

export default Home;
