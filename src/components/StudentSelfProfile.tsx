import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'ahooks';
import {
  ClassPlanListByMonthDataType,
  StudentDataType,
  UpcomingClassPlanListDataType,
  getLoggedInStudent,
  getUpcomingClassPlansByLoggedInStudent,
  getLoggedInStudentCompletedClassPlansByMonth,
  getPackageStatsByLoggedInStudent,
} from 'api/student';
import { PackageStatDataType } from 'api/teacher';
import ClassTable from 'components/ClassTable';
import StudentInfo from 'components/StudentInfo';
import { useState } from 'react';
import { constants } from 'stores/constantStore';

const StudentSelfProfile = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)

  const _year = useDebounce(year, { wait: 500 });

  const classStatData = useQuery<PackageStatDataType, Error>({
    queryKey: [constants.QUERY_KEYS.LOGGED_IN_CLASS_STAT, { year: _year, month: month }],
    queryFn: () => getPackageStatsByLoggedInStudent(year, month)
  })
  
  const studentData = useQuery<StudentDataType, Error>({
    queryKey: [constants.QUERY_KEYS.LOGGED_IN_STUDENT_DETAILS],
    queryFn: () => getLoggedInStudent()
  })

  const upcomingClassListData = useQuery<UpcomingClassPlanListDataType, Error>({
    queryKey: [constants.QUERY_KEYS.LOGGED_IN_STUDENT_UPCOMING_CLASS_LIST],
    queryFn: () => getUpcomingClassPlansByLoggedInStudent()
  })

  const completedClassListData = useQuery<ClassPlanListByMonthDataType, Error>({
    queryKey: [constants.QUERY_KEYS.LOGGED_IN_STUDENT_CLASS_LIST_BY_DATE],
    queryFn: () => getLoggedInStudentCompletedClassPlansByMonth(),
  })

  return (
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
          <div>
            <StudentInfo student={studentData.data.data} />
          </div>
        )}
        <div className="card divide-y divide-base-300 w-full border border-base-300 rounded-r-none overflow-hidden mt-5">
            <div className="p-3 text-center font-medium">Class Statistics</div>
            <div className="overflow-hidden">
              <table className="table">
                <tbody>
                  <tr>
                    <th className="w-32">Year</th>
                    <td>
                      <input
                        type="text"
                        className="input input-sm input-bordered w-20"
                        value={year}
                        onChange={e => setYear(Number(e.target.value))}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-32">Month</th>
                    <td>
                      <select
                        className="select select-sm select-bordered w-20"
                        value={month.toString()}
                        onChange={e => setMonth(Number(e.target.value))}
                      >
                        {constants.MONTHS.map((e, i) => (
                          <option value={i + 1} key={i}>{e}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {classStatData.data?.data.map((stat, i) => (
                    <tr key={i}>
                      <th className="w-32 py-2">{stat.minutes} Min</th>
                      <td>{stat.class_count} classes</td>
                    </tr>
                  ))}
                  <tr>
                    <th className="w-32 py-2">Total</th>
                    <td>{classStatData.data?.data.map(e => e.class_count).reduce((a, b) => a + b) ?? 0} classes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  )
}

export default StudentSelfProfile