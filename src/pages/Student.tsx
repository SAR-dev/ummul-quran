import { useQuery } from '@tanstack/react-query';
import { ClassPlanListByMonthDataType, getCompletedClassPlansByMonth, getUpcomingClassPlansByStudent, UpcomingClassPlanListDataType } from 'api/student';
import ClassTable from 'components/ClassTable';
import NavLayout from 'layouts/NavLayout'
import { useParams } from 'react-router-dom';
import { constants } from 'stores/constantStore';

const Student = () => {
  const { id = "" } = useParams();

  const upcomingClassListData = useQuery<UpcomingClassPlanListDataType, Error>({
    queryKey: [constants.QUERY_KEYS.STUDENT_UPCOMING_CLASS_LIST, { id: Number(id) }],
    queryFn: () => getUpcomingClassPlansByStudent(Number(id)),
    enabled: Number(id) > 0
  })

  const completedClassListData = useQuery<ClassPlanListByMonthDataType, Error>({
    queryKey: [constants.QUERY_KEYS.STUDENT_CLASS_LIST_BY_DATE, { id: Number(id) }],
    queryFn: () => getCompletedClassPlansByMonth(Number(id)),
    enabled: Number(id) > 0
  })

  return (
    <NavLayout>
      <div className="grid grid-cols-4 w-full">
        <div className="col-span-3">
          <div className="p-16 w-full grid grid-cols-1 gap-16">
            <div className="flex flex-col gap-3">
              <div className="font-semibold text-xl">Upcoming Class</div>
              {upcomingClassListData.data && upcomingClassListData.data.data.length > 0 && (
                <ClassTable class_plans={upcomingClassListData.data?.data} />
              )}
            </div>

            {completedClassListData.data?.data.map((class_plan_list, i) => (
              <div className="flex flex-col gap-3" key={i}>
                <div className="font-semibold text-xl">{class_plan_list.year} {constants.MONTHS[class_plan_list.month - 1]}</div>
                <ClassTable class_plans={class_plan_list.class_plans} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </NavLayout>
  )
}

export default Student