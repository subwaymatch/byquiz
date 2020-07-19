import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from 'src/components/layout';
import CourseModule from 'src/components/course/course-module';
import MultipleChoiceQuiz from 'src/components/multiple-choice-quiz';
import { ICourse, ICourseModule, ICourseModulePage } from 'types/course';
import { QuizType, IQuiz, IMultipleChoiceQuiz } from 'types/quiz';
import {
  getAllCourses,
  getCourseData,
  getCourseModulePages,
  getCourseModuleData,
} from 'lib/courses';
import styles from './course.module.scss';
import classNames from 'classnames/bind';
import { getQuizByFullId } from 'lib/quizzes';

const cx = classNames.bind(styles);

type CourseModulePageProps = {
  course: ICourse;
  module: ICourseModule;
  pages: ICourseModulePage[];
  quizzes: IQuiz[][];
};

export default function CourseModulePage({
  course,
  module,
  pages,
  quizzes,
}: CourseModulePageProps) {
  console.log('CourseModulePage');
  console.log(quizzes);

  return (
    <Layout>
      <div className={styles.courseModule}>
        <div className="row">
          <div className="col-12">
            <div className={styles.courseInfo}>
              <span>{course.title}</span>
              <h2>{module.title}</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            {course.modules.map((cm) => (
              <Link
                key={cm}
                href="/course/[courseId]/[moduleId]"
                as={`/course/${course.id}/${cm}`}
              >
                <a
                  className={cx({
                    moduleLink: true,
                    isActive: cm === module.id,
                  })}
                >
                  {cm}
                </a>
              </Link>
            ))}
          </div>

          <div className="col-9">
            {pages.map((page, pageIndex) => (
              <div
                key={page.id}
                style={{
                  borderTop: '1px solid #ddd; padding-top: 1rem;',
                  marginBottom: '2rem;',
                }}
              >
                <h3>{page.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: page.content }} />

                {/* {page.quizzes.map(quiz => {
                  <MultipleChoiceQuiz quiz={quiz} onCorrectSubmission={() => {}} onIncorrectAttempt={() => {}} />
                })} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const courses = await getAllCourses();

  const paths = [];

  courses.forEach((course) => {
    course.modules.forEach((moduleId) => {
      paths.push({
        params: {
          id: course.id,
          module: moduleId,
        },
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id, module } = params;

  const courseId = id as string;
  const moduleId = module as string;

  const courseData = await getCourseData(courseId);
  const moduleData = await getCourseModuleData(courseId, moduleId);
  const pagesData = await getCourseModulePages(courseId, moduleId);
  const pagesQuizFullIds = pagesData.map((pageData) => pageData.quizzes);
  const quizzes: IQuiz[][] = [];

  for (const pageQuizIds of pagesQuizFullIds) {
    const pageQuizzes: IQuiz[] = [];

    for (const fullId of pageQuizIds) {
      pageQuizzes.push(await getQuizByFullId(fullId));
    }

    quizzes.push(pageQuizzes);
  }

  const props = {
    course: courseData,
    module: moduleData,
    pages: pagesData,
    quizzes,
  };

  return {
    props,
  };
};
