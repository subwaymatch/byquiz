import { ICourse } from 'types/course';

type CourseHeaderProps = {
  course: ICourse;
};

export default function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <div>
      <h2>{course.title}</h2>
    </div>
  );
}
