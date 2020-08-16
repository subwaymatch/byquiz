import { GetStaticPaths, GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import _ from 'lodash';
import Layout from 'src/components/layout';
import {
  getAllCourses,
  getCourseData,
  getCourseModulePageData,
} from 'lib/courses';
import { ICourse, ICourseModule, ICourseModulePageData } from 'typing/course';
import CourseSidebar from 'src/components/course/course-sidebar';
import CourseModulePageContent from 'src/components/course/course-module-page-content';
import CourseModulePageQuestions from 'src/components/course/course-module-page-questions';
import CourseModulePagesNavigation from 'src/components/course/course-module-pages-navigation';
import CourseModulePageBottomNavigation from 'src/components/course/course-module-page-bottom-navigation';

type CourseModulePagePageProps = {
  course: ICourse;
  pageData: ICourseModulePageData;
};

export default function CourseModulePagePage({
  course,
  pageData,
}: CourseModulePagePageProps) {
  const currentModule: ICourseModule = _.find(
    course.modules,
    (module) => module.id === pageData.moduleId
  );

  const currentModuleIndex = _.findIndex(
    course.modules,
    (module) => module.id === pageData.moduleId
  );

  const currentPageIndex = _.findIndex(
    currentModule.pages,
    (page) => page.id === pageData.id
  );

  const prevPage =
    currentPageIndex === 0
      ? currentModuleIndex === 0
        ? null
        : _.last(course.modules[currentModuleIndex - 1].pages)
      : currentModule.pages[currentPageIndex - 1];

  const prevModule = prevPage
    ? currentPageIndex === 0
      ? course.modules[currentModuleIndex - 1]
      : currentModule
    : null;

  const nextPage =
    currentPageIndex === currentModule.pages.length - 1
      ? currentModuleIndex === course.modules.length - 1
        ? null
        : _.first(course.modules[currentModuleIndex + 1].pages)
      : currentModule.pages[currentPageIndex + 1];

  const nextModule = nextPage
    ? currentPageIndex === currentModule.pages.length - 1
      ? course.modules[currentModuleIndex + 1]
      : currentModule
    : null;

  const prevModuleLabel = prevModule ? prevModule.title : null;
  const prevPageLabel = prevPage ? prevPage.title : null;
  const prevHref = prevPage
    ? `/course/${course.id}/${prevModule.id}/${prevPage.id}`
    : null;

  const nextModuleLabel = nextModule ? nextModule.title : null;
  const nextPageLabel = nextModule ? nextPage.title : null;
  const nextHref = nextPage
    ? `/course/${course.id}/${nextModule.id}/${nextPage.id}`
    : null;

  return (
    <Layout>
      <div>
        <div className="row">
          <div className="col-3">&nbsp;</div>
          <div className="col-9">
            <CourseModulePagesNavigation
              courseId={course.id}
              moduleId={currentModule.id}
              currentPageId={pageData.id}
              pagesMeta={currentModule.pages}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <CourseSidebar
              course={course}
              currentModuleId={pageData.moduleId}
            />
          </div>

          <div className="col-9">
            <CourseModulePageContent pageData={pageData} />

            <CourseModulePageQuestions questions={pageData.questions} />

            <CourseModulePageBottomNavigation
              prevHref={prevHref}
              prevModuleLabel={prevModuleLabel}
              prevPageLabel={prevPageLabel}
              nextHref={nextHref}
              nextModuleLabel={nextModuleLabel}
              nextPageLabel={nextPageLabel}
            />
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
    course.modules.forEach((module) => {
      module.pages.forEach((page) => {
        paths.push({
          params: {
            id: course.id,
            module: module.id,
            page: page.id,
          },
        });
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id, module, page } = params;

  const courseId = id as string;
  const moduleId = module as string;
  const pageId = page as string;

  const course = await getCourseData(courseId);
  const pageData = await getCourseModulePageData(courseId, moduleId, pageId);

  return {
    props: {
      course,
      pageData,
    },
  };
};
