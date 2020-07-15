import { useState } from 'react';
import styles from './multiple-choice-question.module.scss';

const classNames = require('classnames');

export default function MultipleChoiceQuestion({
  id,
  text,
  options,
  correctOptions,
  hint,
  explanation,
}) {
  const [selectedOptions, setSelectedOptions] = useState(
    new Array(options.length).fill(false)
  );
  const [didSubmit, setDidSubmit] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const numCorrectOptions = correctOptions.reduce(
    (accumulator, currentValue) => accumulator + (currentValue ? 1 : 0),
    0
  );

  return (
    <div
      className={classNames({
        [`${styles.didSubmit}`]: didSubmit,
        [`${styles.isCorrect}`]: selectedOptions.every(
          (didSelectOption, index) => didSelectOption === correctOptions[index]
        ),
      })}
    >
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
              if (didSubmit) return;

              console.log(`Selected option ${index}`);

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
