import { TeacherListType } from "types/teacher";

const TeacherInfo = ({ teacher }: { teacher: TeacherListType }) => {
    return (
        <div className="sticky top-0 card border border-base-300">
            <div className="h-32 w-full flex flex-col gap-5 items-center my-5">
                <img className='h-32 card w-32 object-cover' src={teacher.user.avatar.optimized_url} alt="" />
            </div>
            <div className="overflow-hidden">
                <table className="table">
                    <tbody>
                        <tr>
                            <th className="w-32">Full Name</th>
                            <td>{teacher.user.name}</td>
                        </tr>
                        <tr>
                            <th className="w-32">Gender</th>
                            <td>{teacher.user.gender}</td>
                        </tr>
                        <tr>
                            <th className="w-32">Location</th>
                            <td>{teacher.user.location}</td>
                        </tr>
                        <tr>
                            <th className="w-32">Whatsapp No</th>
                            <td>{teacher.user.whatsapp_no}</td>
                        </tr>
                        <tr>
                            <th className="w-32">Students</th>
                            <td>{teacher.students.length} students</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TeacherInfo