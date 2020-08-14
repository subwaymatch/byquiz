import classNames from 'classnames/bind';
import styles from './message-boxes.module.scss';
import HintocatImage from 'src/images/cute-cartoon-cat.svg';
import CheckofrogImage from 'src/images/cute-cartoon-frog.svg';

const cx = classNames.bind(styles);

export const HintBox = ({ hintMarkdown }: { hintMarkdown?: string }) => (
  <div className={cx('hintBox')}>
    <div className={cx('imageWrapper')}>
      <img
        src={HintocatImage}
        alt="Image of Checkofrog"
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
);

export const CorrectResultBox = ({ explanation }: { explanation?: string }) => {
  return (
    <div className={cx('correctResultBox')}>
      <div className={cx('imageWrapper')}>
        <img
          src={CheckofrogImage}
          alt="Image of Checkofrog"
          className={styles.characterImage}
        />
      </div>

      <div>
        <span className={styles.boxLabel}>Ribbit!</span>

        <div
          dangerouslySetInnerHTML={{
            __html: explanation,
          }}
        />
      </div>
    </div>
  );
};

export const IncorrectResultBox = () => {
  return (
    <div className={cx('incorrectResultBox')}>
      <div className={cx('imageWrapper')}>
        <img
          src={CheckofrogImage}
          alt="Image of Checkofrog"
          className={styles.characterImage}
        />
      </div>

      <div>
        <span className={styles.boxLabel}>Oink...</span>

        <div>Why don't we give it another try?</div>
      </div>
    </div>
  );
};
