import { ArrowDownIcon, ArrowUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { TeacherListType } from 'types/teacher'
import StudentAddModal from './StudentAddModal'

const TeacherInList = ({ teacher }: { teacher: TeacherListType }) => {
    const [addStudentModal, setAddStudentModal] = useState(false)
    const [expand, setExpand] = useState(false)

    return (
        <div className='card p-5 border border-base-300 group hover:shadow-md hover:bg-base-200'>
            <div className="flex flex-row justify-between">
                <div className="flex gap-2 items-center">
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
                <div className="flex gap-2 opacity-0 group-hover:opacity-100">
                    <div className="tooltip" data-tip={expand ? "Hide Students" : "Show Students"}>
                        <button className="btn btn-xs btn-square bg-base-100" onClick={() => setExpand(teacher.students.length > 0 && !expand)}>
                            {expand ? <ArrowUpIcon className='h-3 w-3' /> : <ArrowDownIcon className='h-3 w-3' />}
                        </button>
                    </div>
                    <div className="tooltip" data-tip="Edit">
                        <button className="btn btn-xs btn-square bg-base-100">
                            <PencilIcon className='h-3 w-3' />
                        </button>
                    </div>
                    <div className="tooltip" data-tip="Delete">
                        <button className="btn btn-xs btn-square bg-base-100">
                            <TrashIcon className='h-3 w-3' />
                        </button>
                    </div>
                    <div className="tooltip" data-tip="Add Student">
                        <button className="btn btn-xs btn-square bg-base-100" onClick={() => setAddStudentModal(true)}>
                            <PlusIcon className='h-3 w-3' />
                        </button>
                    </div>
                </div>
            </div>
            {expand && teacher.students.length > 0 && (
                <table className="w-full text-sm text-left table-auto border border-base-300 mt-5">
                    <thead className="text-xs uppercase bg-base-100 border-b border-base-300 text-base-content/75">
                        <tr>
                            <th scope="col" className="px-4 py-2">
                                Name
                            </th>
                            <th scope="col" className="px-4 py-2">
                                Package
                            </th>
                            <th scope="col" className="px-4 py-2">
                                Minutes
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {teacher.students.map((student, i) => (
                            <tr className="bg-base-100 border-b border-base-300 hover:bg-info/20 duration-200 cursor-pointer" key={i}>
                                <th scope="row" className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <img src={student.user.avatar.thumbnail_url} className='h-4 w-4 object-cover rounded-full' alt="" />
                                        {student.user.name}
                                    </div>
                                </th>
                                <th className="px-4 py-2">{student.pack.name}</th>
                                <td className="px-4 py-2">{student.pack.minutes} Min</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <StudentAddModal teacher={teacher} isOpen={addStudentModal} setIsOpen={setAddStudentModal} />
        </div>
    )
}

export default TeacherInList