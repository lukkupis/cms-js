import Head from 'next/head';
import Header from 'components/organisms/Header/Header';

function Home(props) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <div className="container">Welcome to Next.js!</div>
    </>
  );
}

export default Home;
