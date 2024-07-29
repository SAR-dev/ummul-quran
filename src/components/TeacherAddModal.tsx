import { useState } from 'react';
import Modal from './Modal'
import { TeacherAddType } from 'types/teacher';
import { addTeacher } from 'api/teacher';
import { useNotification } from 'contexts/Notification';
import { NotificationType } from 'types/notification';
import { useQueryClient } from '@tanstack/react-query';
import { constants } from 'stores/constantStore';

const TeacherAddModal = ({
    isOpen, 
    setIsOpen
}:{
    isOpen: boolean,
    setIsOpen: (props: boolean) => void;
}) => {
    const notification = useNotification()
    const queryClient = useQueryClient()

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [whatsAppNo, setWhatsAppNo] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = () => {
        setIsLoading(true)
        const payload: TeacherAddType = {
            email: email,
            user: {
                name: name,
                whatsapp_no: whatsAppNo
            }
        }
        addTeacher(payload)
            .then(res => {
                if(res.error){
                    notification.add({
                        title: "Error Occured",
                        message: "There were some problem registering teacher. Please try again later.",
                        status: NotificationType.ERROR
                    })
                } else {
                    notification.add({
                        title: "Teacher Registered",
                        message: "The teacher has been registered successfully. The teacher can login now.",
                        status: NotificationType.SUCCESS
                    })
                    queryClient.invalidateQueries({queryKey: [constants.QUERY_KEYS.TEACHER_LIST]})
                    setIsOpen(false)
                }
            })
            .finally(() => setIsLoading(false))
        
    }

    return (
        <Modal title="Add Teacher" closeButton onClose={() => setIsOpen(false)} isOpen={isOpen} setIsOpen={setIsOpen} maxWidth='25rem'>
            <div className="grid grid-cols-1 gap-5">
                <input type="text" className='input input-bordered' placeholder='Email address' value={email} onChange={e => setEmail(e.target.value)} />
                <input type="text" className='input input-bordered' placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                <input type="text" className='input input-bordered' placeholder='Whats App No' value={whatsAppNo} onChange={e => setWhatsAppNo(e.target.value)} />
                <button className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}>Submit</button>
            </div>
        </Modal>
    )
}

export default TeacherAddModal