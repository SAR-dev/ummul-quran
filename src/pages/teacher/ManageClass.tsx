import { PlayIcon, StopIcon } from '@heroicons/react/24/outline';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ClassPlanDataType, finishClassPlanById, getClassPlanById, startClassPlanById } from 'api/teacher';
import { useNotification } from 'contexts/Notification';
import { parseErrorMessage, RawErrorMessageProps } from 'helpers/error';
import TeacherNavLayout from 'layouts/TeacherNavLayout'
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { constants } from 'stores/constantStore';
import { NotificationType } from 'types/notification';

const ManageClass = () => {
    const { id = "" } = useParams();
    const notification = useNotification();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false)
    const [time, setTime] = useState(new Date());

    const classData = useQuery<ClassPlanDataType, Error>({
        queryKey: [constants.QUERY_KEYS.CLASS_DETAILS, { id: Number(id) }],
        queryFn: () => getClassPlanById(Number(id)),
        enabled: Number(id) > 0
    })

    const minutes = useMemo(() => {
        if (!classData.data || !classData.data.data.started) return 0;
        if(classData.data.data.finished) {
            return  Math. ceil(((new Date(classData.data.data.finish_at)).getTime() - (new Date(classData.data.data.start_at)).getTime()) / 60000)
        }
        return  Math. ceil((time.getTime() - (new Date(classData.data.data.start_at)).getTime()) / 60000)
    }, [time, classData]);

    useEffect(() => {
        // run every 30 seconds
        const interval = setInterval(() => setTime(new Date()), 30000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const startClass = () => {
        setIsLoading(true)
        startClassPlanById(Number(id))
            .then(res => {
                if (res.error) {
                    notification.add({
                        title: "Error Occured",
                        message: parseErrorMessage(res.error as RawErrorMessageProps).message,
                        status: NotificationType.ERROR
                    })
                } else {
                    queryClient.invalidateQueries({ queryKey: [constants.QUERY_KEYS.CLASS_DETAILS] })
                    window.open(classData.data?.data.class_link, '_blank', 'noopener,noreferrer');
                }
            })
            .catch(err => {
                notification.add({
                    title: "Error Occured",
                    message: parseErrorMessage(err as RawErrorMessageProps).message,
                    status: NotificationType.ERROR
                })
            })
            .finally(() => setIsLoading(false))
    }

    const finishClass = () => {
        setIsLoading(true)
        finishClassPlanById(Number(id))
            .then(res => {
                if (res.error) {
                    notification.add({
                        title: "Error Occured",
                        message: parseErrorMessage(res.error as RawErrorMessageProps).message,
                        status: NotificationType.ERROR
                    })
                } else {
                    queryClient.invalidateQueries({ queryKey: [constants.QUERY_KEYS.CLASS_DETAILS] })
                    notification.add({
                        title: "Class Completed",
                        message: "You can update the data of this class or start a new class now.",
                        status: NotificationType.INFO
                    })
                }
            })
            .catch(err => {
                notification.add({
                    title: "Error Occured",
                    message: parseErrorMessage(err as RawErrorMessageProps).message,
                    status: NotificationType.ERROR
                })
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <TeacherNavLayout>
            {classData.data && (
                <div className='w-full flex justify-center'>
                    <div className="grid grid-cols-1 gap-10 py-10 px-5 max-w-[30rem] w-full">
                        <div className="join mx-auto -mb-5">
                            <button className="btn btn-xs join-item">Edit</button>
                            <button className="btn btn-xs join-item">Delete</button>
                        </div>
                        <div className="flex flex-col gap-2 text-center">
                            <div className='text-2xl'>{classData.data.data.topic}</div>
                            <div className='opacity-75'>{classData.data.data.description}</div>
                        </div>
                        <div className="flex justify-center items-center w-48 h-48 rounded-full border-8 border-info mx-auto">
                            <div className="flex flex-col text-center">
                                <div className="text-5xl">{minutes}</div>
                                <div>MINUTES</div>
                            </div>
                        </div>
                        {!classData.data.data.started && (
                            <button className="btn btn-icon" disabled={isLoading} onClick={startClass}>
                                <PlayIcon className='h-5 w-5' />
                                Start Class
                            </button>
                        )}

                        {classData.data.data.started && !classData.data.data.finished && (
                            <div className="grid grid-cols-2 gap-5">
                                <Link to={classData.data.data.class_link} target='_blank' className='btn'>
                                    Open Class Link
                                </Link>
                                <button className="btn btn-icon" disabled={isLoading} onClick={finishClass}>
                                    <StopIcon className='h-5 w-5' />
                                    Finish Class
                                </button>
                            </div>
                        )}

                        {classData.data.data.started && classData.data.data.finished && (
                            <>
                                <div className="flex justify-between w-full">
                                    <div className='flex items-center gap-2'>
                                        <PlayIcon className='h-4 w-4' />
                                        <div>21 July, 2024 12:30 PM</div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <StopIcon className='h-4 w-4' />
                                        <div>21 July, 2024 12:30 PM</div>
                                    </div>
                                </div>
                                <button className="btn btn-info" onClick={() => navigate(-1)}>Complete</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </TeacherNavLayout>
    )
}

export default ManageClass