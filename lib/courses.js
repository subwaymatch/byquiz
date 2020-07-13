import fs from "fs";
import path from "path";
import YAML from "yaml";

const fsPromises = fs.promises;
const coursesPath = path.join(process.cwd(), "content", "course");

async function getCourseData(id) {
  const courseYamlFilePath = path.join(coursesPath, id, "_course.yaml");

  if (!fs.existsSync(courseYamlFilePath)) {
    throw new Error(`_course.yaml for ${id} not found`);
  }

  const courseYaml = await fsPromises.readFile(courseYamlFilePath, {
    encoding: "utf-8",
  });

  const courseData = YAML.parse(courseYaml);

  return { id: id, ...courseData };
}

export async function getAllCourses() {
  const fileNames = await fsPromises.readdir(coursesPath, {
    withFileTypes: true,
  });

  const courses = fileNames
    .filter((dirent) => dirent.isDirectory())
    .map(async (dirent) => {
      const courseData = getCourseData(dirent.name);

      return courseData;
    });

  return Promise.all(courses);
}

export async function getCourseFirstModule(id) {
  const courseYamlFilePath = path.join(coursesPath, id, "_course.yaml");
}
