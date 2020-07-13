import Layout from "components/layout";
import { getAllCourses } from "lib/courses";

export default function CourseHome({ courses }) {
  return (
    <Layout>
      <h2>Courses</h2>

      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const courses = await getAllCourses();

  return {
    props: {
      courses,
    },
  };
}
