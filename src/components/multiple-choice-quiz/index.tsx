import { useState } from 'react';
import styles from './multiple-choice-quiz.module.scss';
import classNames from 'classnames/bind';
import { IMultipleChoiceQuiz } from 'types/quiz';
import ChoiceOption from 'src/components/multiple-choice-quiz/choice-option';

type MultipleChoiceQuizProps = {
  quiz: IMultipleChoiceQuiz;
  onCorrectSubmission?: () => void;
  onIncorrectAttempt?: () => void;
};

const cx = classNames.bind(styles);

export default function MultipleChoiceQuiz({
  quiz,
  onCorrectSubmission,
  onIncorrectAttempt,
}: MultipleChoiceQuizProps) {
  const { options, correctOptions, text, hint, explanation } = quiz;

  const [selectedOptions, setSelectedOptions] = useState<boolean[]>(
    new Array(options.length).fill(false)
  );
  const [didSubmit, setDidSubmit] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const numCorrectOptions = correctOptions.reduce(
    (accumulator, currentValue) => accumulator + (currentValue ? 1 : 0),
    0
  );

  const handleOptionClick = (optionIndex: number) => {
    // If already submitted, do nothing
    if (didSubmit) {
      return;
    }

    if (numCorrectOptions > 1) {
      const selectedOptionsCopy = selectedOptions.slice();
      selectedOptionsCopy[optionIndex] = !selectedOptionsCopy[optionIndex];

      setSelectedOptions(selectedOptionsCopy);
    } else {
      const newSelectedOptions = new Array(options.length).fill(false);

      if (!selectedOptions[optionIndex]) {
        newSelectedOptions[optionIndex] = true;
      }

      setSelectedOptions(newSelectedOptions);
    }
  };

  const handleSubmit = () => {
    let isCorrectTemp = selectedOptions.every(
      (didSelectOption, index) => didSelectOption === correctOptions[index]
    );

    setIsCorrect(isCorrectTemp);

    setDidSubmit(true);

    if (isCorrectTemp) {
      onCorrectSubmission();
    } else {
      onIncorrectAttempt();
    }
  };

  return (
    <div
      className={cx({
        didSubmit: didSubmit,
        isCorrect: isCorrect,
      })}
    >
      {didSubmit && isCorrect && (
        <p className={styles.correctMessage}>Yay! You got this.</p>
      )}

      {didSubmit && !isCorrect && (
        <p className={styles.incorrectMessage}>Oops, nice try!</p>
      )}

      <p>
        {text} {numCorrectOptions > 1 && `Select ${numCorrectOptions}`}
      </p>

      <div className="options-wrapper">
        {options.map((option, index) => (
          <ChoiceOption
            key={index}
            label={String(option)}
            isSelected={selectedOptions[index]}
            isCorrectOption={correctOptions[index]}
            onClick={() => handleOptionClick(index)}
          />
        ))}
      </div>

      <div className={styles.hintBox}>
        <span
          className={styles.hintBoxLabel}
          onClick={() => {
            setShowHint(!showHint);
          }}
        >
          Hint {showHint ? '▴' : '▾'}
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

      {!didSubmit && (
        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={didSubmit}
        >
          Check Your Answer!
        </button>
      )}
    </div>
  );
}