import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { getUpcomingClassPlansByTeacher, UpcomingClassPlanListDataType } from 'api/teacher';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { constants } from 'stores/constantStore';
import Countdown from 'react-countdown';
import ClassTable from './ClassTable';
import { useAuthStore } from 'stores/authStore';

const ClassList = () => {
    const { getLoggedInTeachersId } = useAuthStore()

    const upcomingClassListData = useQuery<UpcomingClassPlanListDataType, Error>({
        queryKey: [constants.QUERY_KEYS.TEACHER_UPCOMING_CLASS_LIST],
        queryFn: () => getUpcomingClassPlansByTeacher()
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

    const countdownRenderer = ({
        hours,
        minutes,
        seconds,
        completed
    }: {
        hours: number,
        minutes: number,
        seconds: number,
        completed: boolean
    }) => {
        if (completed) {
            return `now`;
        } else {
            return <span>in {Math.ceil(hours * 60 + minutes + Math.floor(seconds / 60))} minutes</span>;
        }
    };


    return (
        <div className="p-8 bg-base-200 card border border-base-300 flex flex-col gap-5">

            <div className="flex justify-between">
                <div className="text-xl font-semibold">You have {todayClasses.length} classes today</div>
                <div className="flex gap-3">
                    <Link to="/teachers/create-class" className="btn btn-sm bg-base-100">
                        Schedule a class
                        <PlusIcon className="h-4 w-4" />
                    </Link>
                    <Link to={`/teachers/${getLoggedInTeachersId()}`} className="btn btn-sm bg-base-100">
                        See all
                    </Link>
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
                    <b><Countdown date={new Date(nearestUpcomingClass.start_at)} renderer={countdownRenderer} /></b>
                </div>
            )}

            {todayClasses.length > 0 && <ClassTable class_plans={todayClasses} />}

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