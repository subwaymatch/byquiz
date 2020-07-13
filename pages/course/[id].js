import { getAllCourses } from "lib/courses";
import Layout from "components/layout";

export default function CoursePage(props) {
  console.log(props);

  return (
    <Layout>
      <h2>courseData.title</h2>
    </Layout>
  );
}

export async function getStaticPaths() {
  const courses = await getAllCourses();

  const paths = courses.map((course) => ({
    params: {
      id: course.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: params,
  };
}
