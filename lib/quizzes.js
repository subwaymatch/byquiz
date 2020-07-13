import fs from "fs";
import path from "path";
import YAML from "yaml";

const contentDirectory = path.join(process.cwd(), "content", "quiz");
const mcContentDirectory = path.join(contentDirectory, "multiple-choice");

export function getAllMultipleChoiceQuizIds() {
  const fileNames = fs.readdirSync(mcContentDirectory);

  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.yaml$/, ""),
    },
  }));
}

export function getMultipleChoiceQuizData(id) {
  const quizFile = fs.readFileSync(
    path.join(mcContentDirectory, `${id}.yaml`),
    {
      encoding: "utf8",
    }
  );

  const quizData = YAML.parse(quizFile);

  console.log(quizData);

  return quizData;
}
