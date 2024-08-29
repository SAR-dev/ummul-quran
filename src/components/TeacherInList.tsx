import { ArrowDownIcon, ArrowUpIcon, PencilIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TeacherListType } from 'types/teacher'

const TeacherInList = ({ teacher }: { teacher: TeacherListType }) => {
    const [expand, setExpand] = useState(false)

    return (
        <div className='card p-5 bg-base-300 group'>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                    <div className="h-10 w-10">
                        <img src={teacher.user.avatar.thumbnail_url} className='h-10 w-10 object-cover rounded-full' alt="" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <div className="font-semibold">{teacher.user.name}</div>
                            <div className='text-xs'>({teacher.students.length} Students)</div>
                        </div>
                        <div className="text-xs font-medium">{teacher.user.email}</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="tooltip" data-tip={expand ? "Hide Students" : "Show Students"}>
                        <button className="btn btn-xs btn-square bg-base-100" onClick={() => setExpand(teacher.students.length > 0 && !expand)}>
                            {expand ? <ArrowUpIcon className='h-3 w-3' /> : <ArrowDownIcon className='h-3 w-3' />}
                        </button>
                    </div>
                    <div className="tooltip" data-tip="Edit">
                        <Link to={`/admin/teacher/${teacher.teachers_id}/update`} className="btn btn-xs btn-square bg-base-100">
                            <PencilIcon className='h-3 w-3' />
                        </Link>
                    </div>
                    <div className="tooltip" data-tip="Add Student">
                        <Link to={`/admin/student/${teacher.teachers_id}/create`} className="btn btn-xs btn-square bg-base-100">
                            <PlusIcon className='h-3 w-3' />
                        </Link>
                    </div>
                </div>
            </div>
            {expand && teacher.students.length > 0 && (
                <table className="w-full text-xs md:text-sm text-left table-auto border border-base-300 mt-5">
                    <thead className="text-xs uppercase bg-base-100 border-b border-base-300 text-base-content/75">
                        <tr>
                            <th scope="col" className="p-2 md:px-4 md:py-2">
                                Name
                            </th>
                            <th scope="col" className="p-2 md:px-4 md:py-2">
                                Package
                            </th>
                            <th scope="col" className="p-2 md:px-4 md:py-2">
                                Minutes
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='text-xs md:text-sm'>
                        {teacher.students.map((student, i) => (
                            <tr className="bg-base-100 border-b border-base-300 hover:bg-info/20 duration-200 cursor-pointer" key={i}>
                                <th scope="row" className="p-2 md:px-4 md:py-2">
                                    <div className="flex items-center gap-2">
                                        <img src={student.user.avatar.thumbnail_url} className='h-4 w-4 object-cover rounded-full' alt="" />
                                        {student.user.name}
                                    </div>
                                </th>
                                <th className="p-2 md:px-4 md:py-2">{student.pack.name}</th>
                                <td className="p-2 md:px-4 md:py-2">{student.pack.minutes} Min</td>
                                <td className="p-1 md:p-2">
                                    <div className="tooltip" data-tip="Edit">
                                        <Link to={`/admin/student/${student.students_id}/update`} className='btn btn-xs btn-square'>
                                            <PencilIcon className='h-3 w-3' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default TeacherInList