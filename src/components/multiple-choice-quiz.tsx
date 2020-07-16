import { useState } from 'react';
import styles from './multiple-choice-quiz.module.scss';
import { default as classNames } from 'classnames';
import { IMultipleChoiceQuiz } from 'lib/quizzes';

export default function MultipleChoiceQuiz({
  quiz,
}: {
  quiz: IMultipleChoiceQuiz;
}) {
  const { id, options, correctOptions, text, hint, explanation } = quiz;

  const [selectedOptions, setSelectedOptions] = useState(
    new Array(options.length).fill(false)
  );
  const [didSubmit, setDidSubmit] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const numCorrectOptions = correctOptions.reduce(
    (accumulator, currentValue) => accumulator + (currentValue ? 1 : 0),
    0
  );

  const isCorrect = selectedOptions.every(
    (didSelectOption, index) => didSelectOption === correctOptions[index]
  );

  return (
    <div
      className={classNames({
        [`${styles.didSubmit}`]: didSubmit,
        [`${styles.isCorrect}`]: isCorrect,
      })}
    >
      {didSubmit && isCorrect && (
        <p className={styles.correctMessage}>Yay! You've got this.</p>
      )}

      {didSubmit && !isCorrect && (
        <p className={styles.incorrectMessage}>Oops, nice try!</p>
      )}

      <p>
        {text} {numCorrectOptions > 1 && `Select ${numCorrectOptions}`}
      </p>

      <div className="options-wrapper">
        {options.map((option, index) => (
          <div
            className={classNames({
              [`${styles.optionItem}`]: true,
              [`${styles.correctOption}`]: correctOptions[index],
              [`${styles.selected}`]: selectedOptions[index],
              [`${styles.isCorrect}`]:
                correctOptions[index] === selectedOptions[index],
            })}
            key={index}
            onClick={(e) => {
              e.preventDefault();

              // If already submitted, do nothing
              if (didSubmit) {
                return;
              }

              if (numCorrectOptions > 1) {
                const selectedOptionsCopy = selectedOptions.slice();
                selectedOptionsCopy[index] = !selectedOptionsCopy[index];

                setSelectedOptions(selectedOptionsCopy);
              } else {
                const newSelectedOptions = new Array(options.length).fill(
                  false
                );

                if (!selectedOptions[index]) {
                  newSelectedOptions[index] = true;
                }

                setSelectedOptions(newSelectedOptions);
              }
            }}
          >
            {option}
          </div>
        ))}
      </div>

      <div className={styles.hintBox}>
        <span
          className={styles.hintBoxLabel}
          onClick={() => {
            setShowHint(!showHint);
          }}
        >
          Hint {showHint ? '▾' : '▴'}
        </span>
        {showHint && (
          <div className={styles.hintContent}>
            <div>{hint}</div>
          </div>
        )}
      </div>

      {didSubmit && (
        <div className={styles.explanationBox}>
          <span className={styles.explanationBoxLabel}>Explanation</span>

          <p>{explanation}</p>
        </div>
      )}

      <button
        className={styles.submitBtn}
        onClick={() => {
          setDidSubmit(true);
        }}
        disabled={didSubmit}
      >
        Check Your Answer!
      </button>
    </div>
  );
}
