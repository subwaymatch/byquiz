export interface ICourse {
  id: string;
  title: string;
  description: string;
  modules: string[];
}

export interface ICourseModule {
  title: string;
  pages: string[];
}

export interface ICourseModulePage {
  title: string;
  quizzes: string[];
  content: string;
}
