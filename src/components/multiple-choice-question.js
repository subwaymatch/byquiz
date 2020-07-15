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
        'did-submit': didSubmit,
        'is-correct': false,
        'is-incorrect': false,
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
              [`${styles.selected}`]: selectedOptions[index],
            })}
            key={index}
            onClick={(e) => {
              e.preventDefault();

              console.log(`Selected option ${index}`);

              if (numCorrectOptions > 1) {
                const selectedOptionsCopy = selectedOptions.slice();
                selectedOptionsCopy[index] = !selectedOptionsCopy[index];

                setSelectedOptions(selectedOptionsCopy);
              } else {
                const newSelectedOptions = new Array(options.length).fill(
                  false
                );
                newSelectedOptions[index] = true;

                setSelectedOptions(newSelectedOptions);
              }
            }}
          >
            {option}
          </div>
        ))}
      </div>

      {showHint && (
        <>
          <h3>Hint</h3>
          <div>{hint}</div>
        </>
      )}

      {didSubmit && (
        <>
          <h3>Explanation</h3>
          <p>{explanation}</p>
        </>
      )}

      <button
        className={styles.submitBtn}
        onClick={() => {
          setDidSubmit(true);
        }}
        disabled={didSubmit}
      >
        Submit
      </button>
    </div>
  );
}
