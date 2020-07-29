import { useState, useEffect, useRef, useCallback } from 'react';

export default function WorkerTest() {
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [userCode, setUserCode] = useState('3 * 11');

  const workerRef = useRef();

  useEffect(() => {
    workerRef.current = new Worker('lib/pyodide/worker.js', { type: 'module' });

    workerRef.current.onmessage = (evt) => {
      const data = evt.data;

      console.log('msg from workerRef');
      console.log(data);

      switch (data.type) {
        case 'PYODIDE_LOAD_COMPLETE':
          setIsPyodideReady(true);

          break;

        default:
          console.log('default');
      }
    };

    // Request to load Pyodide in worker thread
    workerRef.current.postMessage({
      type: 'LOAD_PYODIDE',
    });

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const runCode = useCallback(async () => {
    workerRef.current.postMessage({
      type: 'RUN_CODE',
      code: userCode,
    });
  });

  return (
    <div>
      <textarea
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
      />

      {isPyodideReady ? (
        <button onClick={runCode}>Run Code</button>
      ) : (
        <div>Pyodide is still Loading</div>
      )}
    </div>
  );
}
