import Layout from '../components/layout';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsPyodidedLoaded, loadPyodide } from 'lib/slices/pyodideSlice';
import { useEffect, useState } from 'react';

export default function PyodideTestPage() {
  const isPyodideReady = useSelector(selectIsPyodidedLoaded);
  const [isTrue, setIsTrue] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPyodideReady) {
      dispatch(loadPyodide());
    }
  }, []);

  const runSomeCode = () => {
    // Change state for tests
    setIsTrue(!isTrue);

    console.log(
      pyodide.runPython(`
                  import sys
                  sys.version
              `)
    );
    console.log(pyodide.runPython('print(1 + 2)'));
  };

  return (
    <Layout>
      <Head>
        <script src="https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js"></script>
      </Head>
      <div>
        <h1>{isPyodideReady ? 'Pyodided Loaded' : 'Pyodide Loading'}</h1>

        <p>{isTrue ? 'TRUE DAT' : 'FALSE THAT'}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            runSomeCode();
          }}
          disabled={!isPyodideReady}
        >
          Can click now!
        </button>
      </div>
    </Layout>
  );
}
