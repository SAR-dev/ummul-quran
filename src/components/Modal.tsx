import { DialogBackdrop, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ReactNode } from 'react';

const Modal = ({
    isOpen,
    setIsOpen,
    title,
    children,
    footer,
    maxWidth = "30rem",
    closeButton,
    onClose = () => { }
}: {
    isOpen: boolean,
    setIsOpen: (props: boolean) => void,
    title: string,
    children: ReactNode,
    maxWidth?: string,
    closeButton?: boolean,
    footer?: ReactNode,
    onClose?: () => void
}) => {

    const handleClose = () => {
        onClose()
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onClose={() => { }} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-base-content/25" />
            <div className="fixed inset-0 flex w-screen items-center justify-center">
                <DialogPanel className="card p-4 bg-base-100 min-w-96" style={{ maxWidth }}>
                    <DialogTitle className="card flex-row p-5 mb-5 bg-base-200 flex justify-between items-center">
                        <div className='text-lg font-semibold'>{title}</div>
                        {closeButton && (
                            <button className="btn btn-square btn-sm bg-base-100" onClick={handleClose}>
                                <XMarkIcon className='h-5 w-5' />
                            </button>
                        )}
                    </DialogTitle>
                    <div>{children}</div>
                    {footer && (
                        <div className="p-5 bg-base-200">{footer}</div>
                    )}
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default Modal;
