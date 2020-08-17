import { ICourse } from 'typing/course';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import classNames from 'classnames/bind';
import { getAllCourses } from 'lib/courses';
import Layout from 'src/components/layout';
import styles from './course.module.scss';

const cx = classNames.bind(styles);

type CourseIndexPageProps = {
  courses: ICourse[];
};

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const thumbnailVariants = {
  initial: { scale: 0.9, opacity: 0 },
  enter: { scale: 1, opacity: 1, transition },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: { duration: 1.5, ...transition },
  },
};

const frameVariants = {
  hover: { scale: 0.95 },
};

const imageVariants = {
  hover: { scale: 1.1 },
};

export default function CourseIndexPage({ courses }: CourseIndexPageProps) {
  return (
    <Layout>
      <div className={cx('courseIndexWrapper')}>
        <h1 className={cx('pageTitle')}>All Courses</h1>

        <motion.div
          whileHover="hover"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            exit: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              className={cx('courseItem')}
              variants={thumbnailVariants}
            >
              <motion.div
                className="frame"
                whileHover="hover"
                variants={frameVariants}
                transition={transition}
              >
                <div className={cx('courseInfo')}>
                  <h2 className={cx('courseTitle')}>{course.title}</h2>
                  <p>{course.description}</p>
                </div>

                {course.modules && (
                  <motion.div variants={imageVariants} transition={transition}>
                    {course.modules.map((cm) => {
                      return (
                        <Link
                          key={cm.id}
                          href="/course/[course]/[module]/[page]"
                          as={`/course/${course.id}/${cm.id}/${cm.pages[0].id}`}
                        >
                          <a className={styles.moduleItem}>{cm.title}</a>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const courses: ICourse[] = await getAllCourses();

  return {
    props: {
      courses,
    },
  };
};
