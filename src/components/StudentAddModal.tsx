import { useState } from 'react';
import Modal from './Modal'
import { TeacherListType } from 'types/teacher';
import { useNotification } from 'contexts/Notification';
import { NotificationType } from 'types/notification';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { constants } from 'stores/constantStore';
import { getPackages, PackageListDataType } from 'api/package';
import { StudentAddType } from 'types/student';
import { addStudent } from 'api/student';

const StudentAddModal = ({
    teacher,
    isOpen,
    setIsOpen
}: {
    teacher: TeacherListType,
    isOpen: boolean,
    setIsOpen: (props: boolean) => void;
}) => {
    const notification = useNotification()
    const queryClient = useQueryClient()

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [whatsAppNo, setWhatsAppNo] = useState("")
    const [classLink, setClassLink] = useState("")
    const [price, setPrice] = useState(0)
    const [packageId, setPackageId] = useState<number | null>(null)

    const [isLoading, setIsLoading] = useState(false)

    const packageListData = useQuery<PackageListDataType, Error>({
        queryKey: [constants.QUERY_KEYS.PACKAGE_LIST],
        queryFn: () => getPackages(),
    })

    const handlePackageChange = (id: string) => {
        setPackageId(Number(id))
        setPrice(packageListData.data?.data.find(e => e.id == Number(id))?.price_bdt ?? 0)
    }

    const handleSubmit = () => {
        if (packageId == null) return;
        setIsLoading(true)
        const payload: StudentAddType = {
            student: {
                email: email,
                teachers_id: teacher.teachers_id,
                packages_id: packageId,
                class_link: classLink,
                price_bdt: price,
            },
            user: {
                name: name,
                whatsapp_no: whatsAppNo,
                location
            }
        }
        addStudent(payload)
            .then(res => {
                if (res.error) {
                    notification.add({
                        title: "Error Occured",
                        message: "There were some problem registering student. Please try again later.",
                        status: NotificationType.ERROR
                    })
                } else {
                    notification.add({
                        title: "Student Registered",
                        message: "The student has been registered successfully. The teacher can login now.",
                        status: NotificationType.SUCCESS
                    })
                    queryClient.invalidateQueries({ queryKey: [constants.QUERY_KEYS.TEACHER_LIST] })
                    setIsOpen(false)
                }
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal title="Add Student" closeButton onClose={() => setIsOpen(false)} isOpen={isOpen} setIsOpen={setIsOpen} maxWidth='35rem'>
            <div className="grid grid-cols-1 gap-5">
                <label className="input input-bordered flex items-center gap-2">
                    <div className="font-semibold opacity-75 w-20">Email</div>
                    <input type="text" className='grow' placeholder='username@email.com' value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <div className="font-semibold opacity-75 w-20">Name</div>
                    <input type="text" className='grow' placeholder='John Doe' value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <div className="font-semibold opacity-75 w-20">Phone</div>
                    <input type="text" className='grow' placeholder='880*********' value={whatsAppNo} onChange={e => setWhatsAppNo(e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <div className="font-semibold opacity-75 w-20">Location</div>
                    <input type="text" className='grow' placeholder='Dhaka, Bangladesh' value={location} onChange={e => setLocation(e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <div className="font-semibold opacity-75 w-20">Class Link</div>
                    <input type="text" className='grow' placeholder='teams.live.com' value={classLink} onChange={e => setClassLink(e.target.value)} />
                </label>
                <div className="grid grid-cols-2 gap-5">
                    <select className="select select-bordered w-full max-w-xs" onChange={e => handlePackageChange(e.target.value)}>
                        <option disabled selected={packageId == null}>Select Package</option>
                        {packageListData.data?.data.map((e, i) => (
                            <option selected={packageId == e.id} value={e.id} key={i}>{e.name}</option>
                        ))}
                    </select>
                    <label className="input input-bordered flex items-center gap-2">
                        <div className="font-semibold opacity-75">Price</div>
                        <input type="text" className='grow' placeholder='1000' value={price} onChange={e => setPrice(Number(e.target.value))} />
                        <kbd className="kbd kbd-sm -ml-6">TK</kbd>
                    </label>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                    <div className="font-semibold opacity-75 w-20">Teacher</div>
                    <input type="text" className="grow" disabled value={teacher.user.name} />
                </label>
                <button className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}>Submit</button>
            </div>
        </Modal>
    )
}

export default StudentAddModal