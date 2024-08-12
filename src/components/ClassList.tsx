import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { getUpcomingClassPlans, UpcomingClassPlanListDataType } from 'api/teacher';
import { formatDateRange, formatTimeRange } from 'helpers/date';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { constants } from 'stores/constantStore';
import Countdown from 'react-countdown';

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

    const nearestUpcomingClass = useMemo(() => {
        if (todayClasses.length === 0) return null;

        const upcomingClasses = todayClasses.sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());

        return upcomingClasses.length > 0 ? upcomingClasses[0] : null;
    }, [todayClasses]);

    return (
        <div className="p-8 bg-base-200 card border border-base-300 flex flex-col gap-5">

            <div className="flex justify-between">
                <div className="text-xl font-semibold">You have {todayClasses.length} classes today</div>
                <div className="flex gap-3">
                    <Link to="/teacher/create-class" className="btn btn-sm bg-base-100">
                        Schedule a class
                        <PlusIcon className="h-4 w-4" />
                    </Link>
                    <button className="btn btn-sm bg-base-100">
                        See all
                    </button>
                </div>
            </div>

            {nearestUpcomingClass && (
                <div className="bg-info/30 px-6 py-3 card flex-row gap-2 items-center">
                    <div className="w-8">
                        <InformationCircleIcon className="h-5 w-5" />
                    </div>
                    You have a
                    <b>{nearestUpcomingClass.pack.minutes} minutes</b>
                    class with
                    <b>{nearestUpcomingClass.student.name}</b>
                    {nearestUpcomingClass.student.location ? `of ${nearestUpcomingClass.student.location}` : ""}
                    in <b><Countdown date={new Date(nearestUpcomingClass.start_at)} /></b>
                </div>
            )}

            {todayClasses.length > 0 && (
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
                                    <td className="px-6 py-4">
                                        {class_plan.pack.minutes} Min
                                    </td>
                                    <td className="px-6 py-4">{class_plan.student.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {todayClasses.length == 0 && !!upcomingClassListData.data?.data && (
                <div className="bg-base-100 px-6 py-3 card flex-row gap-2 items-center">
                    <div className="w-8 text-xl">🥳</div>
                    You do not have any pending class today
                </div>
            )}

            {(((upcomingClassListData.data?.data.length ?? 0) - todayClasses.length) > 0) && (
                <div className="bg-base-100 px-6 py-3 card flex-row gap-2 items-center">
                    <div className="w-8 text-xl">🚀</div>
                    You have a {(upcomingClassListData.data?.data.length ?? 0) - todayClasses.length} classes planned after today
                </div>
            )}
        </div>
    )
}

export default ClassList