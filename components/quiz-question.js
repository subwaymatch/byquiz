import data from "../content/quiz-questions/london-capital.yaml";

export default function QuizQuestion() {
  console.log(data);

  return (
    <div>
      <h2>{data.question}</h2>

      {data.choices.map((choice, index) => (
        <div key={index}>{choice}</div>
      ))}

      <h3>Hint</h3>
      <div>{data.hint}</div>
    </div>
  );
}
