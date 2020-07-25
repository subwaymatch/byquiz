import Head from 'next/head';
import { useEffect } from 'react';

export default function PyodideWrapper({ children }) {
  useEffect(() => {
    // set the pyodide files URL (packages.json, pyodide.asm.data etc)
    window.languagePluginUrl = 'https://pyodide-cdn2.iodide.io/v0.15.0/full/';

    languagePluginLoader.then(function () {
      console.log(
        pyodide.runPython(`
                  import sys
                  sys.version
              `)
      );
      console.log(pyodide.runPython('print(1 + 2)'));
    });
  }, []);

  return (
    <div className="wrapper">
      <Head>
        <title>Pyodide</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js"></script>
      </Head>

      {children}
    </div>
  );
}
