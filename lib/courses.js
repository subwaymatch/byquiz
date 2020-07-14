import fs from "fs";
import path from "path";
import YAML from "yaml";

const fsPromises = fs.promises;
const coursesPath = path.join(process.cwd(), "content", "course");

export async function getCourseData(courseSlug) {
  const courseYamlFilePath = path.join(coursesPath, courseSlug, "_course.yaml");

  if (!fs.existsSync(courseYamlFilePath)) {
    throw new Error(`_course.yaml for ${courseSlug} not found`);
  }

  const courseYaml = await fsPromises.readFile(courseYamlFilePath, {
    encoding: "utf-8",
  });

  const courseData = YAML.parse(courseYaml);

  return { id: courseSlug, ...courseData };
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

export async function getCourseFirstModule(courseId) {}
