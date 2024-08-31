import { formatDate } from 'helpers/date'
import { useNavigate } from 'react-router-dom'
import { StudentListType } from 'types/teacher'

const StudentTable = ({ students }: { students: StudentListType[] }) => {
    const navigate = useNavigate()

    return (
        <div className="relative overflow-x-auto">
            <div className="flex flex-row md:flex-col border md:border-b-0 border-base-300">
                <div className="bg-base-100 flex flex-1 flex-col min-w-32 md:flex-row divide-y md:divide-y-0 md:divide-x divide-base-300 border-r md:border-r-0 md:border-b border-base-300 sticky left-0 z-[10]">
                    <div className='p-2 font-semibold h-12 flex items-center md:flex-1'>Name</div>
                    <div className='p-2 font-semibold h-12 flex items-center md:flex-1'>Location</div>
                    <div className='p-2 font-semibold h-12 flex items-center md:flex-1'>Package</div>
                    <div className='p-2 font-semibold h-12 flex items-center md:flex-1'>Last Class</div>
                    <div className='p-2 font-semibold h-12 flex items-center md:flex-1'>Next Class</div>
                </div>
                {students.map((student, i) => (
                    <div className="bg-base-100 flex flex-1 flex-shrink-0 flex-col min-w-48 md:flex-row divide-y md:divide-y-0 md:divide-x divide-base-300 border-r md:border-r-0 md:border-b border-base-300 text-sm hover:bg-base-200 cursor-pointer" onClick={() => navigate(`/students/${student.students_id}`)} key={i}>
                        <div className='p-2 font-medium h-12 flex items-center w-auto md:flex-1'>
                            <div className="flex items-center gap-2">
                                <div className="w-8">
                                    <img className="h-8 w-8 card" src={student.user.avatar.thumbnail_url} alt="" />
                                </div>
                                <div>{student.user.name}</div>
                            </div>
                        </div>
                        <div className='p-2 font-medium h-12 flex items-center w-auto md:flex-1'>
                            {student.user.location}
                        </div>
                        <div className='p-2 font-medium h-12 flex items-center w-auto md:flex-1'>
                            {student.pack?.minutes} Min
                        </div>
                        <div className='p-2 font-medium h-12 flex items-center w-auto md:flex-1'>
                            {formatDate(student.last_class)}
                        </div>
                        <div className='p-2 font-medium h-12 flex items-center w-auto md:flex-1'>
                            {formatDate(student.next_class)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StudentTable