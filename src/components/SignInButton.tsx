import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Modal from './Modal';
import { useSignInModalStore } from 'stores/signInModalStore';
import { getLoggedInUser, updateLoggedInUser, UserDataType } from 'api/user';
import { useNotification } from 'contexts/Notification';
import { useAuthStore } from 'stores/authStore';
import { NotificationType } from 'types/notification';
import DropdownSelect from 'packages/DropdownSelect';
import SignInModal from './SignInModal';

const SignInButton = () => {
    const queryClient = useQueryClient()
    const notification = useNotification()
    const { isLoggedIn, setToken } = useAuthStore()
    const { setIsOpenSignIn } = useSignInModalStore();

    const [isLoading, setIsLoading] = useState(false)
    const [nameNotSet, setNameNotSet] = useState(false)

    const [name, setName] = useState("")

    const user = useQuery<UserDataType, Error>({
        queryKey: ['me'],
        queryFn: () => getLoggedInUser(),
        enabled: isLoggedIn()
    })

    useEffect(() => {
        if (user.data) {
            if (!user.data.data.name || user.data.data.name.length < 1) {
                setNameNotSet(true)
            } else {
                setNameNotSet(false)
            }
        }
    }, [user])

    const handleNameChange = () => {
        setIsLoading(true)
        updateLoggedInUser({ name })
            .then((res) => {
                if (res.error) {
                    notification.add({
                        title: "Error Occured",
                        message: "There was an error updating name.",
                        status: NotificationType.ERROR
                    })
                } else {
                    notification.add({
                        title: "Name updated",
                        message: "Thank you for letting us know your name. From now on we will call you " + name + ".",
                        status: NotificationType.INFO
                    })
                    queryClient.invalidateQueries({ queryKey: ["me"] })
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const signOut = () => {
        setToken(null)
        localStorage.clear()
        notification.remove()
        window.location.reload()
    }

    const handleSignOut = () => {
        notification.add({
            title: "Confirmation Required",
            message: "Are you sure you want to Sign Out ? If you sign out all your data will be cleared.",
            status: NotificationType.INFO,
            body: (
                <div className='flex gap-3 justify-center w-full'>
                    <button className="btn btn-error" onClick={signOut}>Yes, I am Sure</button>
                    <button className="btn btn-success" onClick={() => notification.remove()}>No, I will Stay</button>
                </div>
            )
        })
    }

    if (isLoggedIn()) {
        return (
            <div>
                <DropdownSelect
                    button={
                        <button className="btn btn-outline border-base-300">
                            <img src={user.data?.data.avatar.optimized_url} className='h-5 w-5 rounded-full object-cover' />
                            <div>{user.data?.data.name}</div>
                        </button>
                    }
                    options={[
                        { text: user.data?.data.name ?? "User Profile", value: user.data?.data.name ?? "", icon: <div className='mr-1'>😎</div> },
                        { text: "Sign Out", value: "sign-out", handleClick: handleSignOut, icon: <div className='mr-1'>👋</div> },
                    ]}
                />
                <Modal isOpen={nameNotSet} setIsOpen={setNameNotSet} title='What should we call you ?'>
                    <div className='flex flex-col gap-5 pb-5'>
                        <input type="text" placeholder="Type your nickname..." className="input input-bordered w-full" disabled={isLoading} value={name} onChange={e => setName(e.target.value)} />
                        <button className='btn btn-info' disabled={isLoading} onClick={handleNameChange}>
                            {isLoading && (
                                <div className="loading h-5 w-5" />
                            )}
                            Submit
                        </button>
                    </div>
                </Modal>
            </div>
        )
    } else {
        return (
            <div>
                <button className="btn" onClick={() => setIsOpenSignIn(true)}>Sign In</button>
                <SignInModal />
            </div>
        )
    }
}

export default SignInButton