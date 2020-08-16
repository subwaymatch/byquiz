import classNames from 'classnames/bind';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './message-boxes.module.scss';
import CuteCatImage from 'src/images/cute-cartoon-cat.svg';
import CuteFrogImage from 'src/images/cute-cartoon-frog.svg';
import CutePigImage from 'src/images/cute-cartoon-pig.svg';

const cx = classNames.bind(styles);

type HintBoxProps = {
  hintMarkdown?: string;
  show: boolean;
};

export const HintBox = ({ hintMarkdown, show }: HintBoxProps) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className={cx('hintBox')}
        initial={{
          opacity: 0,
          height: 0,
        }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
      >
        <div className={cx('inner')}>
          <div className={cx('imageWrapper')}>
            <img
              src={CuteCatImage}
              alt="Image of a cute cat"
              className={styles.characterImage}
            />
          </div>

          <div>
            <span className={styles.boxLabel}>Hint Meow?</span>
            {hintMarkdown && (
              <div dangerouslySetInnerHTML={{ __html: hintMarkdown }} />
            )}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export const CorrectResultBox = ({ explanation }: { explanation?: string }) => {
  return (
    <div className={cx('correctResultBox')}>
      <div className={cx('inner')}>
        <div className={cx('imageWrapper')}>
          <img
            src={CuteFrogImage}
            alt="Image of a cute frog"
            className={styles.characterImage}
          />
        </div>

        <div>
          <span className={styles.boxLabel}>Great!</span>

          <div
            dangerouslySetInnerHTML={{
              __html: explanation,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const IncorrectResultBox = () => {
  return (
    <div className={cx('incorrectResultBox')}>
      <div className={cx('inner')}>
        <div className={cx('imageWrapper')}>
          <img
            src={CutePigImage}
            alt="Image of a cute pig"
            className={styles.characterImage}
          />
        </div>

        <div>
          <span className={styles.boxLabel}>Oink...</span>

          <div>Let's give it another try!</div>
        </div>
      </div>
    </div>
  );
};
