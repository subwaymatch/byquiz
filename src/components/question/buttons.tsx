import { motion } from 'framer-motion';
import { MdPlayArrow, MdPlayForWork } from 'react-icons/md';
import styles from './buttons.module.scss';

const buttonVariants = {
  hover: {
    y: 2,
    transition: {
      duration: 0.1,
    },
  },
  tap: {
    scale: 0.98,
  },
};

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
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
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
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <MdPlayForWork className={styles.buttonIcon} />
      <span>{label ? label : 'Submit'}</span>
    </motion.button>
  );
};
