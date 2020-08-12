import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './python-coding-question.module.scss';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import {
  monaco,
  EditorDidMount,
  ControlledEditor,
  ControlledEditorOnChange,
} from '@monaco-editor/react';
import { ICodingQuestion } from 'typing/question';
import { CodeResult } from 'typing/pyodide';
import { FiArrowDownRight } from 'react-icons/fi';
import { BsFillPuzzleFill } from 'react-icons/bs';
import { MdPlayArrow, MdPlayForWork } from 'react-icons/md';
import CuteCatImage from 'src/images/cute-cartoon-cat.svg';

const cx = classNames.bind(styles);

type PythonCodingQuestionProps = {
  question: ICodingQuestion;
};

export default function PythonCodingQuestion({
  question,
}: PythonCodingQuestionProps) {
  const defaultCodeResult: CodeResult = {
    hasError: false,
    errorMessage: null,
    output: null,
    stderr: null,
    stdout: null,
  };

  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const [editorValue, setEditorValue] = useState<string>(question.templateCode);
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
      checkCode: question.checkCode,
    });
  };

  const handleEditorDidMount: EditorDidMount = (_, editor) => {
    editorRef.current = editor;

    monaco.init().then((monacoInstance) => {
      editor.addCommand(
        monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter,
        () => {
          alert('CmdCtrl + Enter Pressed!');
        }
      );
    });
  };

  const handleEditorChange: ControlledEditorOnChange = (ev, value) => {
    setEditorValue(value);
  };

  return (
    <div className={cx('pythonCodingQuestionWrapper')}>
      <div className={cx('questionHeader')}>
        <span className={cx('questionTitle')}>Coding Challenge</span>
        <FiArrowDownRight className={styles.reactIcon} />
      </div>

      <div
        className={cx('questionText')}
        dangerouslySetInnerHTML={{ __html: question.text }}
      />

      <div className={cx('codeEditorWrapper')}>
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

        <div className={cx(['editorBox', 'commandBox'])}>
          <a className={styles.hintButton}>
            <BsFillPuzzleFill className={styles.reactIcon} />
            <span>See Hint</span>
          </a>

          <div className={styles.commandButtons}>
            <a
              className={styles.runCodeButton}
              onClick={(e) => {
                runAndCheckCode(editorValue);
              }}
            >
              <MdPlayArrow className={styles.reactIcon} />
              <span>Run Code</span>
            </a>
            <a
              className={styles.submitButton}
              onClick={(e) => {
                runAndCheckCode(editorValue);
              }}
            >
              <MdPlayForWork className={styles.reactIcon} />
              <span>Submit</span>
            </a>
          </div>
        </div>

        <div className={cx('editorBox', 'hintBox')}>
          <img
            src={CuteCatImage}
            alt="Cute Cat"
            className={styles.hintCharacterImage}
          />
          <div>
            <span className={styles.boxLabel}>The wise Hintocat meows...</span>
            <div dangerouslySetInnerHTML={{ __html: question.hint }} />
          </div>
        </div>

        <div className={cx('editorBox', 'outputBox')}>
          <span className={styles.boxLabel}>Output</span>

          <pre>{codeResult.stdout ? codeResult.stdout : 'No Output'}</pre>
        </div>

        <div className={cx('editorBox', 'errorOutputBox')}>
          <span className={styles.boxLabel}>Error</span>

          <pre>
            {codeResult.errorMessage ? codeResult.errorMessage : 'No Error'}
          </pre>
        </div>
      </div>
    </div>
  );
}
