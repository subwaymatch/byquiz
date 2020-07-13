export default function QuizQuestion({ quizData }) {
  console.log(quizData);

  return (
    <div>
      <h2>{quizData.text}</h2>

      <div className="choices-wrapper">
        {quizData.options.map((option, index) => (
          <div key={index}>{option}</div>
        ))}
      </div>

      <h3>Hint</h3>
      <div>{quizData.hint}</div>

      <h3>Explanation</h3>
      <p>{quizData.explanation}</p>
    </div>
  );
}
