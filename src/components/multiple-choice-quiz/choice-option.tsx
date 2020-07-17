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
  return (
    <div
      className={cx('optionItem', {
        correctOption: isCorrectOption,
        selected: isSelected,
      })}
      onClick={onClick}
    >
      {label}
    </div>
  );
}
