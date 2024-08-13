import { useQuery } from '@tanstack/react-query';
import { ClassPlanListByMonthDataType, UpcomingClassPlanListDataType } from 'api/student';
import { getStudentsByTeacherId, getTeacherById, getTeacherCompletedClassPlansByMonth, getUpcomingClassPlansByTeacherId, StudentListDataType, TeacherDataType } from 'api/teacher';
import ClassTable from 'components/ClassTable';
import StudentTable from 'components/StudentTable';
import TeacherInfo from 'components/TeacherInfo';
import AuthNavLayout from 'layouts/AuthNavLayout';
import { useParams } from 'react-router-dom';
import { constants } from 'stores/constantStore';

const Teacher = () => {
  const { id = "" } = useParams();

  const teacherData = useQuery<TeacherDataType, Error>({
    queryKey: [constants.QUERY_KEYS.TEACHER_DETAILS, { id: Number(id) }],
    queryFn: () => getTeacherById(Number(id)),
    enabled: Number(id) > 0
  })

  const studentsData = useQuery<StudentListDataType, Error>({
    queryKey: [constants.QUERY_KEYS.STUDENT_LIST_BY_TEACHER, { id: Number(id) }],
    queryFn: () => getStudentsByTeacherId(Number(id)),
    enabled: Number(id) > 0
  })

  const upcomingClassListData = useQuery<UpcomingClassPlanListDataType, Error>({
    queryKey: [constants.QUERY_KEYS.TEACHER_UPCOMING_CLASS_LIST, { id: Number(id) }],
    queryFn: () => getUpcomingClassPlansByTeacherId(Number(id)),
    enabled: Number(id) > 0
  })

  const completedClassListData = useQuery<ClassPlanListByMonthDataType, Error>({
    queryKey: [constants.QUERY_KEYS.STUDENT_CLASS_LIST_BY_DATE, { id: Number(id) }],
    queryFn: () => getTeacherCompletedClassPlansByMonth(Number(id)),
    enabled: Number(id) > 0
  })

  return (
    <AuthNavLayout>
      <div className="grid grid-cols-4 gap-10 p-10 w-full">
        <div className="col-span-3">
          <div className="w-full grid grid-cols-1 gap-16">
            <div className="flex flex-col gap-3">
              <div className="font-semibold text-xl">Students</div>
              {studentsData.data && studentsData.data.data.length > 0 && (
                <div className="border border-base-300 card overflow-hidden">
                  <StudentTable students={studentsData.data.data} />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-semibold text-xl">Upcoming Class</div>
              {upcomingClassListData.data && upcomingClassListData.data.data.length > 0 && (
                <div className="border border-base-300 card overflow-hidden">
                  <ClassTable class_plans={upcomingClassListData.data?.data} />
                </div>
              )}
            </div>

            {completedClassListData.data?.data.map((class_plan_list, i) => (
              <div className="flex flex-col gap-3" key={i}>
                <div className="font-semibold text-xl">{class_plan_list.year} {constants.MONTHS[class_plan_list.month - 1]}</div>
                <div className="border border-base-300 card overflow-hidden">
                  <ClassTable class_plans={class_plan_list.class_plans} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1">
          {teacherData.data && (
            <TeacherInfo teacher={teacherData.data.data} />
          )}
        </div>
      </div>
    </AuthNavLayout>
  )
}

export default Teacher