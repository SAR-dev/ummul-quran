import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { getUpcomingClassPlans, UpcomingClassPlanListDataType } from 'api/teacher';
import { formatDateRange, formatTimeRange } from 'helpers/date';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from 'stores/constantStore';

const ClassList = () => {
    const navigate = useNavigate();

    const upcomingClassListData = useQuery<UpcomingClassPlanListDataType, Error>({
        queryKey: [constants.QUERY_KEYS.UPCOMING_CLASS_LIST],
        queryFn: () => getUpcomingClassPlans()
    })

    const todayClasses = useMemo(() => {
        if (!upcomingClassListData.data) return [];

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)).getTime();
        const endOfDay = new Date(today.setHours(23, 59, 59, 999)).getTime();

        return upcomingClassListData.data.data.filter((classPlan) => {
            const classTime = new Date(classPlan.start_at).getTime();
            return classTime >= startOfDay && classTime <= endOfDay;
        });
    }, [upcomingClassListData]);

    return (
        <div className="p-8 bg-base-200 card border border-base-300 flex flex-col gap-5">

            <div className="flex justify-between">
                <div className="text-xl font-semibold">You have {todayClasses.length} classes today</div>
                <div className="flex gap-3">
                    <button className="btn btn-sm bg-base-100">
                        Schedule a class
                        <PlusIcon className="h-4 w-4" />
                    </button>
                    <button className="btn btn-sm bg-base-100">
                        See all
                    </button>
                </div>
            </div>

            <div className="bg-info/30 px-6 py-3 card flex-row gap-2 items-center">
                <InformationCircleIcon className="h-5 w-5" />
                You have a <b>60 minutes</b> class in <b>35 minutes</b> with <b>Sayed Rafi</b> of Japan
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left table-auto">
                    <thead className="text-xs uppercase bg-base-100 border-b border-base-300">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time Slot
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Student
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Package
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Location
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {todayClasses.map((class_plan, i) => (
                            <tr className="bg-base-100 border-b border-base-300 hover:bg-info/20 duration-200 cursor-pointer" onClick={() => navigate(`/teacher/class/${class_plan.id}`)} key={i}>
                                <th className="px-6 py-4">{(i + 1).toString().padStart(2, "0")}</th>
                                <th scope="row" className="px-6 py-4">
                                    {formatDateRange(class_plan.start_at, class_plan.finish_at)}
                                </th>
                                <th className="px-6 py-4">
                                    {formatTimeRange(class_plan.start_at, class_plan.finish_at)}
                                </th>
                                <td className="px-6 py-4">
                                    {class_plan.student.name}
                                </td>
                                <td className="px-6 py-4 w-64">
                                    {class_plan.pack.minutes} Min
                                </td>
                                <td className="px-6 py-4">{class_plan.student.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {(((upcomingClassListData.data?.data.length ?? 0) - todayClasses.length) > 0) && (
                <div className="bg-base-100 px-6 py-3 card flex-row gap-2 items-center">
                    <InformationCircleIcon className="h-5 w-5" />
                    You have a {(upcomingClassListData.data?.data.length ?? 0) - todayClasses.length} classes planned after today
                </div>
            )}
        </div>
    )
}

export default ClassList