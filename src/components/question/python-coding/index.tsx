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
import { IPythonCodingQuestion } from 'typing/question';
import { CodeResult } from 'typing/pyodide';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { FiArrowDownRight } from 'react-icons/fi';
import { RiLightbulbLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { RunCodeButton, SubmitButton } from 'src/components/question/buttons';
import {
  HintBox,
  CorrectResultBox,
  IncorrectResultBox,
} from 'src/components/question/message-boxes';

const cx = classNames.bind(styles);

type PythonCodingQuestionProps = {
  question: IPythonCodingQuestion;
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
  const [editorValue, setEditorValue] = useState(question.templateCode);
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [codeResult, setCodeResult] = useState(defaultCodeResult);
  const [submittedCode, setSubmittedCode] = useState('');
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const pyodideWorkerRef = useRef<Worker>();

  useEffect(() => {
    pyodideWorkerRef.current = new Worker('lib/pyodide/worker.js', {
      type: 'module',
    });

    pyodideWorkerRef.current.onmessage = (evt) => {
      const data = evt.data;

      console.log(evt);

      switch (data.type) {
        case 'PYODIDE_LOAD_COMPLETE':
          setIsPyodideReady(true);

          break;

        case 'CODE_RUN_COMPLETE':
          setCodeResult(data.result);
          setIsPyodideReady(true);

          toast(`Finished running code`);

          break;

        case 'CODE_RUN_AND_CHECK_COMPLETE':
          setCodeResult(data.result);
          setIsCorrect(data.result.isCorrect);

          if (data.result.isCorrect) {
            toast(`Very nice!`);
          } else {
            toast(`Oops, let's give that another try...`);
          }

          setIsSubmitComplete(true);
          setIsPyodideReady(true);

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

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const runCode = async () => {
    setIsPyodideReady(false);

    pyodideWorkerRef.current.postMessage({
      type: 'RUN_CODE',
      userCode: editorValue,
    });
  };

  const runAndCheckCode = async () => {
    setIsPyodideReady(false);
    setSubmittedCode(editorValue);

    pyodideWorkerRef.current.postMessage({
      type: 'RUN_AND_CHECK_CODE',
      userCode: editorValue,
      checkCode: question.checkCode,
    });
  };

  const handleEditorDidMount: EditorDidMount = (_, editor) => {
    editorRef.current = editor;

    monaco.init().then((monacoInstance) => {
      editor.addCommand(
        monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter,
        () => {
          runCode();
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
          height="20vh"
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

        <div className={cx('editorBox', 'commandBox')}>
          <a
            className={cx('hintButton', {
              isOpen: showHint,
            })}
            onClick={(e) => {
              e.preventDefault();
              toggleHint();
            }}
          >
            <RiLightbulbLine className={styles.hintIcon} />
            <span>{showHint ? 'Hide Hint' : 'See Hint'}</span>
            {showHint ? (
              <IoMdArrowDropup className={styles.toggleIcon} />
            ) : (
              <IoMdArrowDropdown className={styles.toggleIcon} />
            )}
          </a>

          <div className={styles.commandButtons}>
            <RunCodeButton onClick={runCode} disabled={!isPyodideReady} />

            <SubmitButton
              onClick={runAndCheckCode}
              disabled={!isPyodideReady || submittedCode === editorValue}
            />
          </div>
        </div>

        <HintBox hintMarkdown={question.hint} show={showHint} />

        {isSubmitComplete && isCorrect && (
          <CorrectResultBox explanation={question.explanation} />
        )}

        {isSubmitComplete && !isCorrect && <IncorrectResultBox />}

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
