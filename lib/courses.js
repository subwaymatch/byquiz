import fs from "fs";
import path from "path";
import YAML from "yaml";

const fsPromises = fs.promises;
const coursesPath = path.join(process.cwd(), "content", "course");

export async function getAllCourses() {
  const fileNames = await fsPromises.readdir(coursesPath, {
    withFileTypes: true,
  });

  const courses = fileNames
    .filter((dirent) => dirent.isDirectory())
    .map(async (dirent) => {
      const id = dirent.name;
      const courseYaml = await fsPromises.readFile(
        path.join(coursesPath, id, "course.yaml"),
        { encoding: "utf8" }
      );

      const courseData = YAML.parse(courseYaml);

      return { id: dirent.name, ...courseData };
    });

  return Promise.all(courses);
}
