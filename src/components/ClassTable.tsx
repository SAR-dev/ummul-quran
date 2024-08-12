import { formatDateRange, formatTimeRange } from 'helpers/date'
import { useNavigate } from 'react-router-dom';
import { ClassPlanType } from 'types/teacher'

function ClassTable({ class_plans }: { class_plans: ClassPlanType[] }) {
    const navigate = useNavigate();

    return (
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
                    {class_plans.map((class_plan, i) => (
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
    )
}

export default ClassTable