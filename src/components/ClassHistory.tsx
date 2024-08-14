import { useQuery } from "@tanstack/react-query"
import { ClassPlanListDataType, getCompletedClassPlans, getPackageStats, PackageStatDataType } from "api/teacher"
import { formatDateRange, formatTimeRange } from "helpers/date"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "stores/authStore"
import { constants } from "stores/constantStore"
import { useDebounce } from 'ahooks';

const ClassHistory = () => {
    const { getLoggedInTeachersId } = useAuthStore()
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth() + 1)

    const _year = useDebounce(year, { wait: 500 });
    const _month = useDebounce(month, { wait: 500 });

    const classListData = useQuery<ClassPlanListDataType, Error>({
        queryKey: [constants.QUERY_KEYS.CLASS_LIST, { finished: true }],
        queryFn: () => getCompletedClassPlans()
    })

    const classStatData = useQuery<PackageStatDataType, Error>({
        queryKey: [constants.QUERY_KEYS.CLASS_STAT, { year: _year, month: _month }],
        queryFn: () => getPackageStats(year, month)
    })

    return (
        <div className="sticky top-0 grid grid-cols-1 gap-5">
            <div className="card divide-y divide-base-300 w-full border border-base-300 rounded-r-none overflow-hidden">
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
                                    <input
                                        type="text"
                                        className="input input-sm input-bordered w-20"
                                        value={month}
                                        onChange={e => setMonth(Number(e.target.value))}
                                    />
                                </td>
                            </tr>
                            {classStatData.data?.data.map((stat, i) => (
                                <tr key={i}>
                                    <th className="w-32 py-4">{stat.minutes} Min</th>
                                    <td>{stat.class_count} classes</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card divide-y divide-base-300 w-full border border-base-300 rounded-r-none overflow-hidden">
                <div className="px-5 py-3 bg-base-200 flex justify-between items-center">
                    <div className="font-semibold">
                        Recent Classes
                    </div>
                    <Link to={`/teachers/${getLoggedInTeachersId()}`} className="btn btn-sm bg-base-100">
                        See all
                    </Link>
                </div>
                {classListData.data?.data.data.map((class_plan, i) => (
                    <Link to={`/teachers/class/${class_plan.id}`} className="p-5 hover:bg-base-200" key={i}>
                        <div className="flex items-center gap-2">
                            <div className="w-8">
                                <img className="h-8 w-8 card" src={class_plan.teacher.avatar.thumbnail_url} alt="" />
                            </div>
                            <div className="flex flex-col">
                                <div className="font-medium">{class_plan.student.name}</div>
                                <div className="text-sm">{class_plan.pack.minutes} Min</div>
                            </div>
                        </div>
                        <div className="text-sm mt-2">
                            {formatDateRange(class_plan.start_at, class_plan.finish_at)} ({formatTimeRange(class_plan.start_at, class_plan.finish_at)})
                        </div>
                    </Link>
                ))}
                {classListData.data?.data.data.length == 0 && (
                    <div className="p-5">
                        🚫 No class list yet
                    </div>
                )}
            </div>
        </div>
    )
}

export default ClassHistory