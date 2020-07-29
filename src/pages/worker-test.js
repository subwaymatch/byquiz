import { useEffect, useRef, useCallback } from 'react';

export default function WorkerTest() {
  const workerRef = useRef();
  useEffect(() => {
    workerRef.current = new Worker('../worker.js', { type: 'module' });
    workerRef.current.onmessage = (evt) => console.log(evt.data);
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const handleWork = useCallback(async () => {
    workerRef.current.postMessage({
      type: 'LOAD_PYODIDE',
    });
  }, []);

  return (
    <div>
      <p>Do work in a WebWorker!</p>
      <button onClick={handleWork}>Calculate PI</button>
    </div>
  );
}
