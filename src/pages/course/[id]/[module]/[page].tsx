import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from 'src/components/layout';
import {
  getAllCourses,
  getCourseData,
  getCourseModulePageData,
} from 'lib/courses';
import { ICourse, ICourseModulePageData } from 'typing/course';
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
  const currentModule = course.modules.filter(
    (module) => module.id === pageData.moduleId
  )[0];
  return (
    <Layout>
      <div className="courseModulePageWrapper">
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
              prevHref={`/`}
              prevModuleLabel="Prev Module"
              prevPageLabel="Prev Page"
              nextHref={`/`}
              nextModuleLabel="Next Module"
              nextPageLabel="Next Page"
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
