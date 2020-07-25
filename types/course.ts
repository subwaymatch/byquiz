import { IQuestion } from './question';

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
  questions: string[];
}

export interface ICourseModulePageData {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  questions: IQuestion[];
  content: string;
}
