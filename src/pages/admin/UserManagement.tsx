import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { getTeachers, TeacherListDataType } from 'api/teacher'
import TeacherAddModal from 'components/TeacherAddModal'
import AdminNavLayout from 'layouts/AdminNavLayout'
import { useState } from 'react'
import { constants } from 'stores/constantStore'

const UserManagement = () => {
    const [addTeacherModal, setAddTeacherModal] = useState(false)
    const [addStudentModal, setAddStudentModal] = useState(false)

    const teacherListData = useQuery<TeacherListDataType, Error>({
        queryKey: [constants.QUERY_KEYS.TEACHER_LIST],
        queryFn: () => getTeachers(),
    })

    return (
        <AdminNavLayout>
            <div className="p-16 grid grid-cols-1 gap-5">
                <div className='flex gap-5'>
                    <button className="btn btn-secondary" onClick={() => setAddTeacherModal(true)}>Add Teacher</button>
                    <button className="btn btn-secondary" onClick={() => setAddStudentModal(true)}>Add Student</button>
                </div>
                <div className='w-96'>
                    <div className="grid grid-cols-1 gap-5">
                        {teacherListData.data?.data.map((teacher, i) => (
                            <div className='card p-5 border border-base-300 flex-row justify-between group' key={i}>
                                <div className="flex gap-2 items-center">
                                    <div className="h-8 w-8">
                                        <img src={teacher.user.avatar.thumbnail_url} className='h-8 w-8 object-cover rounded-full' alt="" />
                                    </div>
                                    <div className="font-semibold">{teacher.user.name}</div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100">
                                    <button className="btn btn-sm btn-square">
                                        <PencilIcon className='h-4 w-4' />
                                    </button>
                                    <button className="btn btn-sm btn-square">
                                        <TrashIcon className='h-4 w-4' />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <TeacherAddModal isOpen={addTeacherModal} setIsOpen={setAddTeacherModal} />
        </AdminNavLayout>
    )
}

export default UserManagement