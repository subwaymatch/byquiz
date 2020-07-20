import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { ICourse, ICourseModule, ICourseModulePage } from 'types/course';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import { getQuizByFullId } from './quizzes';

const fsPromises = fs.promises;
const coursesPath = path.join(process.cwd(), 'content', 'course');
const courseYamlFileName = '_course.yaml';
const courseModuleYamlFileName = '_module.yaml';

export async function readYamlFile<T>(filePath: string): Promise<T> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Yaml ${filePath} not found`);
  }

  const yamlString = await fsPromises.readFile(filePath, {
    encoding: 'utf-8',
  });

  const parsedObject = YAML.parse(yamlString) as T;

  return parsedObject;
}

export async function getCourseData(courseId: string): Promise<ICourse> {
  const courseYamlFilePath = path.join(
    coursesPath,
    courseId,
    courseYamlFileName
  );

  const courseData = await readYamlFile<ICourse>(courseYamlFilePath);

  return { id: courseId, ...courseData };
}

export async function getAllCourses(): Promise<ICourse[]> {
  const fileNames = await fsPromises.readdir(coursesPath, {
    withFileTypes: true,
  });

  const courses = fileNames
    .filter((dirent) => dirent.isDirectory())
    .map(async (dirent) => {
      const courseData = await getCourseData(dirent.name);

      return courseData;
    });

  return Promise.all(courses);
}

export async function getCourseModuleData(
  courseId: string,
  moduleId: string
): Promise<ICourseModule> {
  const moduleYamlFilePath = path.join(
    coursesPath,
    courseId,
    moduleId,
    courseModuleYamlFileName
  );

  const courseModuleData = await readYamlFile<ICourseModule>(
    moduleYamlFilePath
  );

  return { id: moduleId, ...courseModuleData };
}

export async function getCourseModules(
  courseId: string
): Promise<ICourseModule[]> {
  const moduleIds = (await getCourseData(courseId)).modules;

  const courseModules = Promise.all(
    moduleIds.map(async (moduleId) => {
      return await getCourseModuleData(courseId, moduleId);
    })
  );

  return courseModules;
}

export async function getCourseModulePageData(
  courseId: string,
  moduleId: string,
  pageId: string
): Promise<ICourseModulePage> {
  const pageFilePath = path.join(
    coursesPath,
    courseId,
    moduleId,
    `${pageId}.md`
  );

  const fileContents = fs.readFileSync(pageFilePath, 'utf-8');

  // Use gray-matter to parse the post metadata section
  const matterResult: {
    data: {
      title: string;
      quizzes: string[];
    };
    content: string;
  } = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const quizzes = Promise.all(
    matterResult.data.quizzes.map(async (quizFullId) => {
      return await getQuizByFullId(quizFullId);
    })
  );

  return {
    id: pageId,
    title: matterResult.data.title,
    quizzes: matterResult.data.quizzes,
    content: contentHtml,
  };
}

export async function getCourseModulePages(
  courseId: string,
  moduleId: string
): Promise<ICourseModulePage[]> {
  const moduleData = await getCourseModuleData(courseId, moduleId);

  const pages = moduleData.pages;

  const pagesData = Promise.all(
    pages.map(async (pageId) => {
      return await getCourseModulePageData(courseId, moduleId, pageId);
    })
  );

  return pagesData;
}
