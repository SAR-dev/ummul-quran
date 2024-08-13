import { useState } from 'react';
import Modal from './Modal'
import { TeacherAddType } from 'types/teacher';
import { addTeacher } from 'api/teacher';
import { useNotification } from 'contexts/Notification';
import { NotificationType } from 'types/notification';
import { useQueryClient } from '@tanstack/react-query';
import { constants } from 'stores/constantStore';
import { parseErrorMessage, RawErrorMessageProps } from 'helpers/error';

const TeacherAddModal = ({
    isOpen,
    setIsOpen
}: {
    isOpen: boolean,
    setIsOpen: (props: boolean) => void;
}) => {
    const notification = useNotification()
    const queryClient = useQueryClient()

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [whatsAppNo, setWhatsAppNo] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = () => {
        setIsLoading(true)
        const payload: TeacherAddType = {
            email: email,
            user: {
                name: name,
                whatsapp_no: whatsAppNo,
                location
            }
        }
        addTeacher(payload)
            .then(() => {
                notification.add({
                    title: "Teacher Registered",
                    message: "The teacher has been registered successfully. The teacher can login now.",
                    status: NotificationType.SUCCESS
                })
                queryClient.invalidateQueries({ queryKey: [constants.QUERY_KEYS.TEACHER_LIST] })
                setIsOpen(false)
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
        <Modal title="Add Teacher" closeButton onClose={() => setIsOpen(false)} isOpen={isOpen} setIsOpen={setIsOpen} maxWidth='25rem'>
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
                <button className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}>Submit</button>
            </div>
        </Modal>
    )
}

export default TeacherAddModal