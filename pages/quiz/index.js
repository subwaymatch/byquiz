import Link from "next/link";
import Layout from "components/Layout";
import { getAllMultipleChoiceQuizIds } from "lib/quizzes";
export default function QuizHome(props) {
  console.log(props);
  return (
    <Layout>
      <h2>List of Multiple Choice Quizzes</h2>

      {/* {multipleChoiceQuizzes.map((q) => (
        <Link
          to="/quiz/multiple-choice/[id]"
          as={`/quiz/multiple-choice/${q.id}`}
        >
          <a className="quiz-link">{q.id}</a>
        </Link>
      ))} */}
    </Layout>
  );
}

export async function getStaticProps() {
  const paths = getAllMultipleChoiceQuizIds();

  return {
    props: {
      paths,
    },
  };
}
