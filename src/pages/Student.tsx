import { useQuery } from '@tanstack/react-query';
import { ClassPlanListByMonthDataType, getStudentCompletedClassPlansByMonth, getStudentById, getUpcomingClassPlansByStudentId, StudentDataType, UpcomingClassPlanListDataType } from 'api/student';
import ClassTable from 'components/ClassTable';
import StudentInfo from 'components/StudentInfo';
import AuthNavLayout from 'layouts/AuthNavLayout';
import { useParams } from 'react-router-dom';
import { constants } from 'stores/constantStore';

const Student = () => {
  const { id = "" } = useParams();

  const studentData = useQuery<StudentDataType, Error>({
    queryKey: [constants.QUERY_KEYS.STUDENT_DETAILS, { id: Number(id) }],
    queryFn: () => getStudentById(Number(id)),
    enabled: Number(id) > 0
  })

  const upcomingClassListData = useQuery<UpcomingClassPlanListDataType, Error>({
    queryKey: [constants.QUERY_KEYS.STUDENT_UPCOMING_CLASS_LIST, { id: Number(id) }],
    queryFn: () => getUpcomingClassPlansByStudentId(Number(id)),
    enabled: Number(id) > 0
  })

  const completedClassListData = useQuery<ClassPlanListByMonthDataType, Error>({
    queryKey: [constants.QUERY_KEYS.STUDENT_CLASS_LIST_BY_DATE, { id: Number(id) }],
    queryFn: () => getStudentCompletedClassPlansByMonth(Number(id)),
    enabled: Number(id) > 0
  })

  return (
    <AuthNavLayout>
      <div className="grid grid-cols-4 gap-10 p-10 w-full">
        <div className="col-span-3">
          <div className="w-full grid grid-cols-1 gap-16">
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
          {studentData.data && (
            <div className="border border-base-300 card overflow-hidden">
              <StudentInfo student={studentData.data.data} />
            </div>
          )}
        </div>
      </div>
    </AuthNavLayout>
  )
}

export default Student