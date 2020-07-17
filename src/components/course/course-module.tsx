import Link from 'next/link';
import { ICourse, ICourseModule, ICourseModulePage } from 'types/course';

import ModulePage from './module-page';

export default function CourseModule() {
  return (
    <div>
      <h3>Course Module</h3>
      <ModulePage />
      <ModulePage />
      <ModulePage />
      <ModulePage />
    </div>
  );
}
