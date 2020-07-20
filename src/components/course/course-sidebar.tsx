import Link from 'next/link';
import { ICourse } from 'types/course';

type CourseSidebarProps = {
  course: ICourse;
};

export default function CourseSidebar({ course }: CourseSidebarProps) {
  return (
    <div className="sidebar">
      {course.modules.map((module) => (
        <Link
          key={module.id}
          href="/course/[courseId]/[moduleId]/[pageId]"
          as={`/course/${course.id}/${module.id}/${module.pages[0].id}`}
        >
          <div>{module.title}</div>
        </Link>
      ))}
    </div>
  );
}
