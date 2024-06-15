import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const ClassList = () => {
    const navigate = useNavigate();

    return (
        <div className="p-8 bg-base-200 card border border-base-300 flex flex-col gap-5">

            <div className="flex justify-between">
                <div className="text-xl font-semibold">You have 5 classes today</div>
                <div className="flex gap-3">
                    <button className="btn btn-sm bg-base-100">
                        See all
                    </button>
                </div>
            </div>

            <div className="bg-info/30 px-6 py-3 card flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <InformationCircleIcon className="h-5 w-5" />
                    You have a <b>60 minutes</b> class with <b>Sayed Rafi</b> of Japan next
                </div>
                <div>35 minutes left</div>
            </div>

            <div className="relative overflow-x-auto">
                <table className="table bg-base-100">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Time Slot</th>
                            <th>Student</th>
                            <th>Country</th>
                            <th>Last Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(3)].map((_, i) => (
                            <tr className="hover:bg-info/20 duration-200 cursor-pointer" onClick={() => navigate("/students/1")} key={i}>
                                <th>{(i + 1).toString().padStart(2, "0")}</th>
                                <td>12 July, 2024</td>
                                <td>0800 - 0900</td>
                                <td>Sayed Ar Rafi</td>
                                <td>Japan</td>
                                <td className="w-64">Simple notes</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ClassList