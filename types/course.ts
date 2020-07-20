import { IQuiz } from './quiz';

export interface ICourse {
  id: string;
  title: string;
  description: string;
  modules: ICourseModule[];
}

export interface ICourseModule {
  id: string;
  title: string;
  pages: ICourseModulePageMeta[];
}

export interface ICourseModulePageMeta {
  id: string;
  title: string;
  quizzes: string[];
}

export interface ICourseModulePageData {
  id: string;
  title: string;
  quizzes: IQuiz[];
  content: string;
}
