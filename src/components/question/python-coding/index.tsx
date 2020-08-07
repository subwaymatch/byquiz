import { useState, useEffect, useRef, useCallback } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-tomorrow';
import styles from './coding-question.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type CodeResult = {
  hasError: boolean;
  errorMessage?: null | string;
  output?: null | string;
  stderr?: null | string;
  stdout?: null | string;
};

export default function PythonCodingQuestion({
  templateCode,
  checkCode,
}: {
  templateCode: string;
  checkCode: string;
}) {
  const defaultCodeResult: CodeResult = {
    hasError: false,
    errorMessage: null,
    output: null,
    stderr: null,
    stdout: null,
  };

  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [userCode, setUserCode] = useState(templateCode);
  const [codeResult, setCodeResult] = useState(defaultCodeResult);
  const [isSubmitInProgress, setIsSubmitInProgress] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const pyodideWorkerRef = useRef<Worker>();

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

        case 'CODE_RUN_AND_CHECK_COMPLETE':
          setCodeResult(data.result);

          if (data.didPass) {
            setIsCorrect(true);
          } else {
            setIsCorrect(false);
          }

          setIsSubmitInProgress(false);

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

  const runAndCheckCode = async (codeStr) => {
    console.log('runCode()');
    setIsSubmitInProgress(true);

    pyodideWorkerRef.current.postMessage({
      type: 'RUN_AND_CHECK_CODE',
      userCode: codeStr,
      checkCode,
    });
  };

  return (
    <div
      className={cx({
        didSubmit: isSubmitInProgress,
        isCorrect,
      })}
    >
      <div>
        <AceEditor
          mode="python"
          theme="tomorrow"
          value={userCode}
          onChange={setUserCode}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          fontSize={20}
        />

        {!isSubmitInProgress && isCorrect && (
          <p>Yes! Your submission is correct.</p>
        )}

        {!isSubmitInProgress && !isCorrect && (
          <button
            id="btn-submit-code"
            className={styles.submitBtn}
            onClick={(e) => {
              runAndCheckCode(userCode);
            }}
            disabled={!isPyodideReady || isSubmitInProgress}
          >
            {isPyodideReady ? 'Run!' : 'Loading Python Engine'}
          </button>
        )}
      </div>

      <div className={cx([styles.runResultWrapper])}>
        {!!codeResult.output && (
          <div className={cx(['box', 'outputBox'])}>
            <span className={styles.outputBoxTitle}>Output</span>

            <div className={styles.outputBoxContent}>{codeResult.output}</div>
          </div>
        )}

        {!!codeResult.stdout && (
          <div className={cx(['box', 'stdoutBox'])}>
            <span className={styles.outputBoxTitle}>stdout</span>

            <div className={styles.outputBoxContent}>{codeResult.stdout}</div>
          </div>
        )}

        {!!codeResult.errorMessage && (
          <div className={cx(['box', 'errorMessageBox'])}>
            <span className={styles.outputBoxTitle}>Error Message</span>

            <div className={styles.outputBoxContent}>
              {codeResult.errorMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
