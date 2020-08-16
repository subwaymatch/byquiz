import { motion } from 'framer-motion';
import { MdPlayArrow, MdPlayForWork } from 'react-icons/md';
import styles from './buttons.module.scss';

type RunCodeButtonProps = {
  label?: string;
  disabled: boolean;
  onClick(): void;
};

export const RunCodeButton = ({
  label,
  disabled,
  onClick,
}: RunCodeButtonProps) => {
  return (
    <motion.button
      className={styles.runCodeButton}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
      whileHover={{
        y: 2,
        transition: {
          duration: 0.1,
        },
      }}
      whileTap={{
        scale: 0.97,
      }}
    >
      <MdPlayArrow className={styles.buttonIcon} />
      <span>{label ? label : 'Run Code'}</span>
    </motion.button>
  );
};

type SubmitButtonProps = {
  label?: string;
  disabled: boolean;
  onClick(): void;
};

export const SubmitButton = ({
  label,
  disabled,
  onClick,
}: SubmitButtonProps) => {
  return (
    <motion.button
      className={styles.submitButton}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
      whileHover={{
        y: 2,
        transition: {
          duration: 0.1,
        },
      }}
      whileTap={{
        scale: 0.97,
      }}
    >
      <MdPlayForWork className={styles.buttonIcon} />
      <span>{label ? label : 'Submit'}</span>
    </motion.button>
  );
};
