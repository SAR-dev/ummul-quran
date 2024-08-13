import { useQuery } from "@tanstack/react-query"
import { ClassPlanListDataType, getCompletedClassPlans } from "api/teacher"
import { formatDateRange, formatTimeRange } from "helpers/date"
import { Link } from "react-router-dom"
import { useAuthStore } from "stores/authStore"
import { constants } from "stores/constantStore"

const ClassHistory = () => {
    const { getLoggedInTeachersId } = useAuthStore()

    const classListData = useQuery<ClassPlanListDataType, Error>({
        queryKey: [constants.QUERY_KEYS.CLASS_LIST, { finished: true }],
        queryFn: () => getCompletedClassPlans()
    })

    return (
        <div className="card divide-y divide-base-300 w-full border border-base-300 rounded-r-none sticky top-0 overflow-hidden">
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
                            <div className="text-sm">{class_plan.student.location}</div>
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
    )
}

export default ClassHistory