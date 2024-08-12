import { formatDate } from 'helpers/date'
import { useNavigate } from 'react-router-dom'
import { StudentListType } from 'types/teacher'

const StudentTable = ({ students }: { students: StudentListType[] }) => {
    const navigate = useNavigate()

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left table-auto">
                <thead className="text-xs uppercase bg-base-100 border-b border-base-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Location
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Package
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Last Class
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Next Class
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, i) => (
                        <tr className="bg-base-100 border-b border-base-300 hover:bg-info/20 duration-200 cursor-pointer" onClick={() => navigate(`/students/${student.students_id}`)} key={i}>
                            <th scope="row" className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8">
                                        <img className="h-8 w-8 card" src={student.user.avatar.thumbnail_url} alt="" />
                                    </div>
                                    <div>{student.user.name}</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">{student.user.location}</td>
                            <td className="px-6 py-4">{student.pack.minutes} Min</td>
                            <td className="px-6 py-4">{formatDate(student.last_class)}</td>
                            <td className="px-6 py-4">{formatDate(student.next_class)}4</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StudentTable