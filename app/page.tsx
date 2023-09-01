import Head from "next/head";
import DonkeyGame from "../components/donkey-game";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Pin the Tail on the Donkey</title>
        <meta name="description" content="Pin the Tail on the Donkey Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto min-h-screen flex justify-center">
        <DonkeyGame />
      </main>
    </div>
  );
};

export default Home;
