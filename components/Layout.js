import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div className="wrapper">
      <Head>
        <title>Mini Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="main-content">{children}</div>
      </main>

      <footer>
        <div>Mini Quiz App</div>
      </footer>

      <style jsx>{`
        .wrapper {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          line-height: 1.8;
        }

        main {
          padding: 5rem 0;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 720px;
        }

        .main-content {
          max-width: 700px;
          background: #fc3;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer > div {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
