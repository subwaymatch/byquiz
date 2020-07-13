import fs from "fs";
import path from "path";
import YAML from "yaml";

const quizContentPath = path.join(process.cwd(), "content", "quiz");
const multipleChoicePath = path.join(quizContentPath, "multiple-choice");

export function getAllMultipleChoiceQuizIds() {
  const fileNames = fs.readdirSync(multipleChoicePath);

  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.yaml$/, ""),
    },
  }));
}

export function getMultipleChoiceQuizData(id) {
  const quizFile = fs.readFileSync(
    path.join(multipleChoicePath, `${id}.yaml`),
    {
      encoding: "utf-8",
    }
  );

  const quizData = YAML.parse(quizFile);

  // Extract correct answers
  quizData["correctOptions"] = quizData["options"].map((option) => {
    return option.toString().endsWith("[o]") ? true : false;
  });

  console.log(quizData);

  return quizData;
}
