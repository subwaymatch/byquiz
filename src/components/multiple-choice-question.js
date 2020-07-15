export default function MultipleChoiceQuestion({
  id,
  text,
  options,
  hint,
  explanation,
}) {
  return (
    <div>
      <h2>{text}</h2>

      <div className="choices-wrapper">
        {options.map((option, index) => (
          <div key={index}>{option}</div>
        ))}
      </div>

      <h3>Hint</h3>
      <div>{hint}</div>

      <h3>Explanation</h3>
      <p>{explanation}</p>
    </div>
  );
}
