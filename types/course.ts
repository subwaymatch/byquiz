export interface ICourse {
  id: string;
  title: string;
  description: string;
  modules: string[];
}

export interface ICourseModule {
  id: string;
  title: string;
  pages: string[];
}

export interface ICourseModulePage {
  id: string;
  title: string;
  quizzes: string[];
  content: string;
}
