import { formatDate } from "helpers/date"
import { Link } from "react-router-dom"
import { StudentListType } from "types/teacher"

const StudentInfo = ({ student }: { student: StudentListType }) => {
    return (
        <div className="card border border-base-300">
            <div className="h-32 w-full flex flex-col gap-5 items-center my-5">
                <img className='h-32 card w-32 object-cover' src={student.user.avatar.optimized_url} alt="" />
            </div>
            <div className="overflow-hidden">
                <table className="table">
                    <tbody>
                        <tr>
                            <th className="w-32">Full Name</th>
                            <td>{student.user.name}</td>
                        </tr>
                        <tr>
                            <th className="w-32">Gender</th>
                            <td>{student.user.gender}</td>
                        </tr>
                        <tr>
                            <th className="w-32">Location</th>
                            <td>{student.user.location}</td>
                        </tr>
                        <tr>
                            <th className="w-32">Whatsapp No</th>
                            <td>{student.user.whatsapp_no}</td>
                        </tr>
                        <tr>
                            <th className="w-32">Package</th>
                            <td>{student.pack.name}, {student.pack.minutes} Min</td>
                        </tr>
                        <tr>
                            <th className="w-32">Class Link</th>
                            <td>
                                <Link to={student.class_link} target="_blank" className="btn btn-xs">Open Class Link</Link>
                            </td>
                        </tr>
                        <tr>
                            <th className="w-32">Last Class</th>
                            <td>{formatDate(student.last_class)}</td>
                        </tr>
                        <tr>
                            <th className="w-32">Next Class</th>
                            <td>{formatDate(student.next_class)}</td>
                        </tr>
                        <tr>
                            <th className="w-32">Teacher</th>
                            <td>{student.teacher.name}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentInfo