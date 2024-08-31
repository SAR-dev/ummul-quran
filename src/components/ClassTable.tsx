import { formatDateRange, formatTimeRange } from 'helpers/date'
import { useNavigate } from 'react-router-dom';
import { ClassPlanType } from 'types/teacher'

function ClassTable({ class_plans }: { class_plans: ClassPlanType[] }) {
    const navigate = useNavigate();

    return (
        <div className="relative overflow-x-auto">
            <div className="flex flex-row md:flex-col border md:border-b-0 border-base-300">
                <div className="bg-base-100 flex flex-1 flex-col min-w-32 md:flex-row divide-y md:divide-y-0 md:divide-x divide-base-300 border-r md:border-r-0 md:border-b border-base-300 sticky left-0 z-[10]">
                    <div className='p-2 font-semibold h-12 flex items-center md:w-10'>#</div>
                    <div className='p-2 font-semibold h-12 flex items-center md:flex-1'>Date</div>
                    <div className='p-2 font-semibold h-12 flex items-center md:flex-1'>Time Slot</div>
                    <div className='p-2 font-semibold h-12 flex items-center md:flex-1'>Student</div>
                    <div className='p-2 font-semibold h-12 flex items-center md:flex-1'>Package</div>
                    <div className='p-2 font-semibold h-12 flex items-center md:flex-1'>Location</div>
                </div>
                {class_plans.map((class_plan, i) => (
                    <div className="bg-base-100 flex flex-1 flex-shrink-0 flex-col min-w-48 md:flex-row divide-y md:divide-y-0 md:divide-x divide-base-300 border-r md:border-r-0 md:border-b border-base-300 text-sm hover:bg-base-200 cursor-pointer" onClick={() => navigate(`/teachers/class/${class_plan.id}`)} key={i}>
                        <div className='p-2 font-medium h-12 flex items-center w-auto md:w-10'>
                        {(i + 1).toString().padStart(2, "0")}
                        </div>
                        <div className='p-2 font-medium h-12 flex items-center w-auto md:flex-1'>
                        {formatDateRange(class_plan.start_at, class_plan.finish_at)}
                        </div>
                        <div className='p-2 font-medium h-12 flex items-center w-auto md:flex-1'>
                        {formatTimeRange(class_plan.start_at, class_plan.finish_at)}
                        </div>
                        <div className='p-2 font-medium h-12 flex items-center w-auto md:flex-1'>
                        {class_plan.student.name}
                        </div>
                        <div className='p-2 font-medium h-12 flex items-center w-auto md:flex-1'>
                        {class_plan.pack.minutes} Min
                        </div>
                        <div className='p-2 font-medium h-12 flex items-center w-auto md:flex-1'>
                        {class_plan.student.location}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClassTable