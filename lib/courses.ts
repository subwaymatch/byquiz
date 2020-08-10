import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import {
  ICourse,
  ICourseModule,
  ICourseModulePageData,
  ICourseModulePageMeta,
} from 'typing/course';
import matter, { GrayMatterFile } from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import { getQuestionByFullId } from './questions';

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

export async function readFileFrontMatter<T>(filePath: string) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Markdown file ${filePath} not found`);
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');

  // Use gray-matter to parse the post metadata section
  const matterResult: GrayMatterFile<string> = matter(fileContents);

  return {
    ...matterResult.data,
  } as T;
}

export async function readMarkdownFile(filePath: string): Promise<any> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Markdown file ${filePath} not found`);
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');

  // Use gray-matter to parse the post metadata section
  const matterResult: GrayMatterFile<string> = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    ...matterResult.data,
    content: contentHtml,
  };
}

export async function getCourseData(courseId: string): Promise<ICourse> {
  const courseYamlFilePath = path.join(
    coursesPath,
    courseId,
    courseYamlFileName
  );

  const parsedCourseYaml = await readYamlFile<{
    title: string;
    description?: string;
    modules?: string[];
  }>(courseYamlFilePath);

  const description = parsedCourseYaml.hasOwnProperty('description')
    ? parsedCourseYaml.description
    : null;

  const modules = parsedCourseYaml.hasOwnProperty('modules')
    ? await Promise.all(
        parsedCourseYaml.modules.map(async (moduleId) => {
          return await getCourseModuleData(courseId, moduleId);
        })
      )
    : [];

  return {
    id: courseId,
    title: parsedCourseYaml.title,
    description,
    modules,
  };
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

  const parsedCourseModuleYaml = await readYamlFile<{
    title: string;
    pages: string[];
  }>(moduleYamlFilePath);

  if (
    !parsedCourseModuleYaml.hasOwnProperty('pages') ||
    parsedCourseModuleYaml.pages.length === 0
  ) {
    throw new Error('A module must have at least one page');
  }

  const pages = await Promise.all(
    parsedCourseModuleYaml.pages.map(async (pageId) => {
      return await getCourseModulePageMetaData(courseId, moduleId, pageId);
    })
  );

  return { id: moduleId, title: parsedCourseModuleYaml.title, pages };
}

export async function getCourseModulePageMetaData(
  courseId: string,
  moduleId: string,
  pageId: string
): Promise<ICourseModulePageMeta> {
  const pageFilePath = path.join(
    coursesPath,
    courseId,
    moduleId,
    `${pageId}.md`
  );

  const metaData = await readFileFrontMatter<{
    title: string;
    questions: string[];
  }>(pageFilePath);

  return {
    id: pageId,
    ...metaData,
  } as ICourseModulePageMeta;
}

export async function getCourseModulePageData(
  courseId: string,
  moduleId: string,
  pageId: string
): Promise<ICourseModulePageData> {
  const pageFilePath = path.join(
    coursesPath,
    courseId,
    moduleId,
    `${pageId}.md`
  );

  const pageData = await readMarkdownFile(pageFilePath);

  const questionFullIds = pageData.hasOwnProperty('questions')
    ? (pageData.questions as string[])
    : [];

  const questions = await Promise.all(
    questionFullIds.map(async (questionFullId) => {
      return await getQuestionByFullId(questionFullId);
    })
  );

  return {
    id: pageId,
    courseId,
    moduleId,
    title: pageData.title,
    content: pageData.content,
    questions,
  } as ICourseModulePageData;
}
