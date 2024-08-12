import { PlayIcon, StopIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query'
import { ClassPlanDataType, getClassPlanById } from 'api/teacher';
import TeacherNavLayout from 'layouts/TeacherNavLayout'
import { useParams } from 'react-router-dom';
import { constants } from 'stores/constantStore';

const ManageClass = () => {
    const { id = "" } = useParams();

    const classData = useQuery<ClassPlanDataType, Error>({
        queryKey: [constants.QUERY_KEYS.CLASS_DETAILS, { id: Number(id) }],
        queryFn: () => getClassPlanById(Number(id)),
        enabled: Number(id) > 0
    })

    return (
        <TeacherNavLayout>
            {classData.data && (
                <div className='w-full flex justify-center'>
                    <div className="grid grid-cols-1 gap-5 py-10 px-5 max-w-[30rem] w-full">
                        <div className="flex flex-col gap-2 text-center">
                            <div>{classData.data.data.topic}</div>
                            <div className='opacity-75 text-sm'>{classData.data.data.description}</div>
                        </div>
                        <div className="flex justify-center items-center w-48 h-48 rounded-full border-8 border-info mx-auto">
                            <div className="flex flex-col text-center">
                                <div className="text-5xl">30</div>
                                <div>MINUTES</div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button className="btn btn-icon">
                                <PlayIcon className='h-5 w-5' />
                                Start Class
                            </button>
                            <button className="btn btn-icon">
                                <StopIcon className='h-5 w-5' />
                                Finish Class
                            </button>
                        </div>
                        <div className="flex justify-between">
                            <div>Start At</div>
                            <div>Finish At</div>
                        </div>
                        <div>Button to Start</div>
                        <div>Button to Finish</div>
                        <div>Button to Complete</div>
                    </div>
                </div>
            )}
        </TeacherNavLayout>
    )
}

export default ManageClass