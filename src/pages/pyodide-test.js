import Layout from '../components/layout';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { loadPyodide } from 'lib/slices/pyodideSlice';
import { useEffect } from 'react';

const usePyodide = () => {
  console.log('usePyodide');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPyodide());
  }, [dispatch]);
};

export default function PyodideTestPage() {
  usePyodide();

  const isPyodideLoading = useSelector((state) => state.pyodide.isLoading);

  return (
    <Layout>
      <Head>
        <script src="https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js"></script>
      </Head>
      <div>
        <h1>{isPyodideLoading ? 'Loading Pyodide' : 'Loading complete!'}</h1>
      </div>
    </Layout>
  );
}
