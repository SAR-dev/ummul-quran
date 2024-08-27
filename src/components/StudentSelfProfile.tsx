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

  return (
    <div className="w-full max-w-96 mx-auto my-5">
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