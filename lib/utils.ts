import matter, { GrayMatterFile } from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import YAML from 'yaml';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';

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

export async function getFileContents(
  filePath: string
): Promise<string | null> {
  if (fs.existsSync(filePath)) {
    return await fsPromises.readFile(path.join(filePath), {
      encoding: 'utf-8',
    });
  } else {
    return null;
  }
}
