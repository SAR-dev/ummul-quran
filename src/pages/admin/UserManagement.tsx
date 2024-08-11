import { PlusIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import { getPackages, PackageListDataType } from 'api/package'
import { getTeachers, TeacherListDataType } from 'api/teacher'
import PackageAddModal from 'components/PackageAddModal'
import PackageInList from 'components/PackageInList'
import TeacherAddModal from 'components/TeacherAddModal'
import TeacherInList from 'components/TeacherInList'
import AdminNavLayout from 'layouts/AdminNavLayout'
import { useState } from 'react'
import { constants } from 'stores/constantStore'

// location
// utc

const UserManagement = () => {
    const [addTeacherModal, setAddTeacherModal] = useState(false)
    const [addPackageModal, setAddPackageModal] = useState(false)

    const teacherListData = useQuery<TeacherListDataType, Error>({
        queryKey: [constants.QUERY_KEYS.TEACHER_LIST],
        queryFn: () => getTeachers(),
    })

    const packageListData = useQuery<PackageListDataType, Error>({
        queryKey: [constants.QUERY_KEYS.PACKAGE_LIST],
        queryFn: () => getPackages(),
    })

    return (
        <AdminNavLayout>
            <div className="px-16 py-10">
                <div className="flex gap-10 items-start">
                    <div className="grid grid-cols-1 gap-5 w-[30rem]">
                        <div className="flex items-center justify-between">
                            <div className='font-semibold opacity-75'>👨‍🎓 Teacher List</div>
                            <button className="btn btn-sm btn-ghost" onClick={() => setAddTeacherModal(true)}>
                                <PlusIcon className='h-5 w-5' />
                                Add Teacher
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-5">
                            {teacherListData.data?.data.map((teacher, i) => (
                                <TeacherInList teacher={teacher} key={i} />
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 w-96">
                        <div className="flex items-center justify-between">
                            <div className='font-semibold opacity-75'>🏷️ Package List</div>
                            <button className="btn btn-sm btn-ghost" onClick={() => setAddPackageModal(true)}>
                                <PlusIcon className='h-5 w-5' />
                                Add Package
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-5">
                            {packageListData.data?.data.map((pac, i) => (
                                <PackageInList pac={pac} key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <TeacherAddModal isOpen={addTeacherModal} setIsOpen={setAddTeacherModal} />
            <PackageAddModal isOpen={addPackageModal} setIsOpen={setAddPackageModal} />
        </AdminNavLayout>
    )
}

export default UserManagement