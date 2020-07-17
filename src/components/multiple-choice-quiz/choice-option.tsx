import styles from './multiple-choice-quiz.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type ChoiceOptionProps = {
  label: string;
  isSelected: boolean;
  isCorrectOption: boolean;
  onClick: () => void;
};

export default function ChoiceOption({
  label,
  isSelected,
  isCorrectOption,
  onClick,
}: ChoiceOptionProps) {
  const isUserCorrect = isSelected === isCorrectOption;

  return (
    <div
      className={cx('optionItem', {
        isCorrectOption,
        isSelected,
        isUserCorrect,
      })}
      onClick={onClick}
    >
      {label}
    </div>
  );
}
