import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import styles from './python-coding-question.module.scss';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import { EditorDidMount, ControlledEditorOnChange } from '@monaco-editor/react';
import { CodeResult } from 'typing/pyodide';

const ControlledEditor = dynamic(
  import('@monaco-editor/react').then((mod) => mod.ControlledEditor),
  {
    ssr: false,
  }
);

type PythonCodingQuestionComponentProps = {
  templateCode: string;
  checkCode: string;
  language: string;
};

export default function PythonCodingQuestionComponent({
  templateCode,
  checkCode,
}: PythonCodingQuestionComponentProps) {
  const defaultCodeResult: CodeResult = {
    hasError: false,
    errorMessage: null,
    output: null,
    stderr: null,
    stdout: null,
  };

  const [editorValue, setEditorValue] = useState<string>(templateCode);
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor>();
  const [isPyodideReady, setIsPyodideReady] = useState(false);
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

  const handleEditorDidMount: EditorDidMount = (_, editor) => {
    editorRef.current = editor;

    // 3 == KeyCode.Enter, 2048 == KeyMod.CtrlCmd
    editor.addCommand(3 | 2048, () => {
      alert('CmdCtrl + Enter Pressed!');
    });
  };

  const handleEditorChange: ControlledEditorOnChange = (ev, value) => {
    setEditorValue(value);
  };

  return (
    <div className={styles.codeEditorWrapper}>
      <ControlledEditor
        height="40vh"
        value={editorValue}
        editorDidMount={handleEditorDidMount}
        onChange={handleEditorChange}
        language="python"
        options={{
          folding: false,
          fontSize: 19,
          wordWrap: 'on',
          minimap: {
            enabled: false,
          },
          extraEditorClassName: styles.codeEditor,
        }}
      />

      <div className={classnames([styles.editorBox, styles.commandBox])}>
        <a className={styles.hintButton}>See Hint</a>

        <div className={styles.commandButtons}>
          <a className={styles.runCodeButton}>Run Code</a>
          <a className={styles.submitButton}>Submit</a>
        </div>
      </div>

      <div className={classnames([styles.editorBox, styles.outputBox])}>
        <span className={styles.boxLabel}>Output</span>

        <pre>No Output</pre>
      </div>

      <div className={classnames([styles.editorBox, styles.errorOutputBox])}>
        <span className={styles.boxLabel}>Error</span>

        <pre>No Output</pre>
      </div>
    </div>
  );
}
