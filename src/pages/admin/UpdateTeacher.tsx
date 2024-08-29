import { useEffect, useState } from 'react';
import { TeacherAddType } from 'types/teacher';
import { addTeacher, getTeacherById, TeacherDataType } from 'api/teacher';
import { useNotification } from 'contexts/Notification';
import { NotificationType } from 'types/notification';
import { useQueryClient } from '@tanstack/react-query';
import { constants } from 'stores/constantStore';
import { parseErrorMessage, RawErrorMessageProps } from 'helpers/error';
import AdminNavLayout from 'layouts/AdminNavLayout';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTeacher = () => {
    const { id = "" } = useParams();

    const notification = useNotification()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [whatsAppNo, setWhatsAppNo] = useState("")
    const [conatctNo, setConatctNo] = useState("")
    const [gender, setGender] = useState("MALE")
    const [utc, setUtc] = useState(0)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getTeacherById(Number(id))
            .then(res => {
                const data: TeacherDataType = res;
                setEmail(data.data.user.email)
                setName(data.data.user.name ?? "")
                setLocation(data.data.user.location ?? "")
                setWhatsAppNo(data.data.user.whatsapp_no ?? "")
                setConatctNo(data.data.user.contact_no ?? "")
                setGender(data.data.user.gender ?? "MALE")
                setUtc(data.data.user.utc)
            })
            .catch(err => {
                notification.add({
                    title: "Error Occured",
                    message: parseErrorMessage(err as RawErrorMessageProps).message,
                    status: NotificationType.ERROR
                })
            })
            .finally(() => setIsLoading(false))
    }, [id])


    const handleSubmit = () => {
        setIsLoading(true)
        const payload: TeacherAddType = {
            email: email,
            user: {
                name: name,
                whatsapp_no: whatsAppNo,
                contact_no: conatctNo,
                gender,
                location
            }
        }
        addTeacher(payload)
            .then(() => {
                notification.add({
                    title: "Teacher Updated",
                    message: "The teacher has been updated successfully.",
                    status: NotificationType.SUCCESS
                })
                queryClient.invalidateQueries({ queryKey: [constants.QUERY_KEYS.TEACHER_LIST] })
                navigate(-1)
            })
            .catch(err => {
                notification.add({
                    title: "Error Occured",
                    message: parseErrorMessage(err as RawErrorMessageProps).message,
                    status: NotificationType.ERROR
                })
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <AdminNavLayout>
            <div className="p-5 md:px-16 md:py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
                    <label className="form-control flex flex-col w-full">
                        <div className="label">
                            <span className="label-text">Email Address</span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered"
                            value={email}
                            disabled
                            onChange={e => setEmail(e.target.value)}
                        />
                    </label>
                    <label className="form-control flex flex-col w-full">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </label>
                    <label className="form-control flex flex-col w-full">
                        <div className="label">
                            <span className="label-text">WhatsApp No</span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered"
                            value={whatsAppNo}
                            onChange={e => setWhatsAppNo(e.target.value)}
                        />
                    </label>
                    <label className="form-control flex flex-col w-full">
                        <div className="label">
                            <span className="label-text">Contact No</span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered"
                            value={conatctNo}
                            onChange={e => setConatctNo(e.target.value)}
                        />
                    </label>
                    <label className="form-control flex flex-col w-full">
                        <div className="label">
                            <span className="label-text">Location</span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                    </label>
                    <label className="form-control flex flex-col w-full">
                        <div className="label">
                            <span className="label-text">Select Gender</span>
                        </div>
                        <select
                            className="select select-bordered w-full"
                            value={gender}
                            onChange={e => setGender(e.target.value)}
                        >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <div className="font-semibold opacity-75 w-20">UTC</div>
                        <input type="text" className='grow' placeholder='+0900' value={utc} onChange={e => setUtc(Number(e.target.value))} />
                    </label>
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}>Update Teacher</button>
                </div>
            </div>
        </AdminNavLayout>
    )
}

export default UpdateTeacher