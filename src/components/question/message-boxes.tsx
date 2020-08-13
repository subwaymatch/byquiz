import HintocatImage from 'src/images/cute-cartoon-cat.svg';
import classNames from 'classnames/bind';
import styles from './message-boxes.module.scss';

const cx = classNames.bind(styles);

export const HintBox = ({ hintMarkdown }: { hintMarkdown: string }) => (
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
      <div dangerouslySetInnerHTML={{ __html: hintMarkdown }} />
    </div>
  </div>
);
