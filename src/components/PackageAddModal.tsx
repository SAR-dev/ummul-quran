import { useState } from 'react';
import Modal from './Modal'
import { useNotification } from 'contexts/Notification';
import { NotificationType } from 'types/notification';
import { useQueryClient } from '@tanstack/react-query';
import { constants } from 'stores/constantStore';
import { PackageAddType } from 'types/package';
import { addPackage } from 'api/package';

const PackageAddModal = ({
    isOpen,
    setIsOpen
}: {
    isOpen: boolean,
    setIsOpen: (props: boolean) => void;
}) => {
    const notification = useNotification()
    const queryClient = useQueryClient()

    const [name, setName] = useState("")
    const [minutes, setMinutes] = useState(60)
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = () => {
        setIsLoading(true)
        const payload: PackageAddType = {
            name, minutes, description, default_price: price
        }
        addPackage(payload)
            .then(res => {
                if (res.error) {
                    notification.add({
                        title: "Error Occured",
                        message: "There were some problem registering package. Please try again later.",
                        status: NotificationType.ERROR
                    })
                } else {
                    notification.add({
                        title: "Package Registered",
                        message: "The package has been registered successfully.",
                        status: NotificationType.SUCCESS
                    })
                    queryClient.invalidateQueries({ queryKey: [constants.QUERY_KEYS.PACKAGE_LIST] })
                    setIsOpen(false)
                }
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal title="Add Package" closeButton onClose={() => setIsOpen(false)} isOpen={isOpen} setIsOpen={setIsOpen} maxWidth='25rem'>
            <div className="grid grid-cols-1 gap-5">
                <label className="input input-bordered flex items-center gap-2">
                    <div className="font-semibold opacity-75 w-20">Name</div>
                    <input type="text" className='grow' placeholder='Pac 4 U' value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <div className="font-semibold opacity-75 w-20">Desc</div>
                    <input type="text" className='grow' placeholder='Simple details' value={description} onChange={e => setDescription(e.target.value)} />
                </label>
                <div className="grid grid-cols-2 gap-5">
                    <label className="input input-bordered flex items-center gap-2">
                        <div className="font-semibold opacity-75">Minutes</div>
                        <input type="text" className='grow' placeholder='Class Length' value={minutes} onChange={e => setMinutes(Number(e.target.value))} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <div className="font-semibold opacity-75">Price</div>
                        <input type="text" className='grow' placeholder='Default Price' value={price} onChange={e => setPrice(Number(e.target.value))} />
                    </label>
                </div>
                <button className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}>Submit</button>
            </div>
        </Modal>
    )
}

export default PackageAddModal