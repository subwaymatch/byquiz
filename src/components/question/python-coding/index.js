import { useState, useEffect, useRef, useCallback } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-tomorrow';

export default function PythonCodingQuestion() {
  const defaultCodeResult = {
    hasError: false,
    output: null,
    stderr: null,
    stdout: null,
  };

  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [userCode, setUserCode] = useState('3 * 11');
  const [codeResult, setCodeResult] = useState(defaultCodeResult);

  const pyodideWorkerRef = useRef();

  useEffect(() => {
    pyodideWorkerRef.current = new Worker('lib/pyodide/worker.js', {
      type: 'module',
    });

    pyodideWorkerRef.current.onmessage = (evt) => {
      const data = evt.data;

      console.log('message');
      console.log(evt);

      switch (data.type) {
        case 'PYODIDE_LOAD_COMPLETE':
          setIsPyodideReady(true);

          break;

        case 'CODE_RUN_COMPLETED':
          setCodeResult(data.result);

          break;

        default:
          // do nothing
          break;
      }
    };

    // Request to load Pyodide in worker thread
    pyodideWorkerRef.current.postMessage({
      type: 'LOAD_PYODIDE',
    });

    return () => {
      pyodideWorkerRef.current.terminate();
    };
  }, []);

  const runCode = async () => {
    console.log('runCode()');
    pyodideWorkerRef.current.postMessage({
      type: 'RUN_CODE',
      code: userCode,
    });
  };

  return (
    <div>
      <div>
        <AceEditor
          mode="python"
          theme="tomorrow"
          onChange={setUserCode}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          fontSize={20}
        />

        <button
          onClick={(e) => {
            runCode(userCode);
          }}
          disabled={!isPyodideReady}
        >
          {isPyodideReady ? 'Run!' : 'Loading Python Engine'}
        </button>
      </div>

      {!!codeResult.output && (
        <div className="outputWrapper">
          <h4>Output</h4>

          {codeResult.output}
        </div>
      )}
    </div>
  );
}
