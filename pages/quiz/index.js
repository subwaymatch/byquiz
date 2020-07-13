import Link from "next/link";
import Layout from "components/layout";
import { getAllMultipleChoiceQuizIds } from "lib/quizzes";

import styles from "./index.module.scss";

export default function QuizHome(props) {
  console.log(props);
  return (
    <Layout>
      <h2>List of Multiple Choice Quizzes</h2>

      {props.paths.map((path) => (
        <Link
          key={path.params.id}
          href="/quiz/multiple-choice/[id]"
          as={`/quiz/multiple-choice/${path.params.id}`}
        >
          <a className={styles["quiz-link"]}>{path.params.id}</a>
        </Link>
      ))}
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
