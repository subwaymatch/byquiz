import classNames from 'classnames/bind';
import styles from './buttons.module.scss';
import { MdPlayArrow, MdPlayForWork } from 'react-icons/md';

const cx = classNames.bind(styles);

type RunCodeButtonProps = {
  disabled: boolean;
  onClick(): void;
};

export const RunCodeButton = ({ disabled, onClick }: RunCodeButtonProps) => {
  return (
    <button
      className={styles.runCodeButton}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
    >
      <MdPlayArrow className={styles.buttonIcon} />
      <span>Run Code</span>
    </button>
  );
};

type SubmitButtonProps = {
  disabled: boolean;
  onClick(): void;
};

export const SubmitButton = ({ disabled, onClick }: SubmitButtonProps) => {
  return (
    <button
      className={styles.submitButton}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
    >
      <MdPlayForWork className={styles.buttonIcon} />
      <span>Submit</span>
    </button>
  );
};
