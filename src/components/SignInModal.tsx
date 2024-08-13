import { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Modal from './Modal';
import { useSignInModalStore } from 'stores/signInModalStore';
import { useNotification } from 'contexts/Notification';
import { useAuthStore } from 'stores/authStore';
import { constants } from 'stores/constantStore';
import { NotificationType } from 'types/notification';
import { sendMagicLink, verifyKey } from 'api/auth';
import { AuthTokenType } from 'types/token';

const SignInModal = () => {
    const notification = useNotification()
    const navigate = useNavigate()
    const { setToken } = useAuthStore()
    const { isOpenSignIn, setIsOpenSignIn, disableClose } = useSignInModalStore();

    const [isLoading, setIsLoading] = useState(false)
    const [isMailSent, setIsMailSent] = useState(false)

    const [email, setEmail] = useState("");
    const [magicKeys, setMagicKeys] = useState<string[]>([...Array(constants.AUTH_KEY_SIZE)].map(() => ""))
    const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(constants.AUTH_KEY_SIZE).fill(null));

    const handleEmailSubmit = () => {
        if (!constants.REGEX_PATTERN.EMAIL.test(email)) {
            notification.add({
                title: "Invalid Email",
                message: "Please use valid email address. If you use invalid email address magic token can not be sent.",
                status: NotificationType.ERROR
            })
            return;
        }
        setIsLoading(true);
        sendMagicLink({ email })
            .then(() => {
                setIsMailSent(true)
                notification.add({
                    title: "Mail Sent",
                    message: "Magic token has been sent to your email address. Copy the token and paste it in the following screen.",
                    status: NotificationType.SUCCESS
                })
            })
            .catch(() => {
                notification.add({
                    title: "Error Occured",
                    message: "There was an error sending magic token to your email address. Please try again",
                    status: NotificationType.ERROR
                })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleMagicKeySubmit = () => {
        if (magicKeys.length < constants.AUTH_KEY_SIZE) return;
        setIsLoading(true);

        verifyKey({ email, magic_key: magicKeys.join("") })
            .then((res) => {
                const data: AuthTokenType = res.data as AuthTokenType;
                setToken(data.access_token)
                setIsMailSent(true)
                toast.success("You have signed in successfully. Enjoy 😎👌🔥 !!!")
            })
            .catch(() => {
                notification.add({
                    title: "Error Occured",
                    message: "There was an error verifying magic token. Please use valid magic token.",
                    status: NotificationType.ERROR
                })
            })
            .finally(() => {
                setIsLoading(false)
                setIsOpenSignIn(false)
            })
    }

    const handleClose = () => {
        if (disableClose) {
            setIsOpenSignIn(false)
            navigate(-1)
        } else {
            setIsOpenSignIn(false)
        }
    }

    const goNext = () => {
        setMagicKeys([...Array(constants.AUTH_KEY_SIZE)].map(() => ""))
        setIsMailSent(true)
    }

    useEffect(() => {
        if (magicKeys.filter(e => e != "").length == constants.AUTH_KEY_SIZE) handleMagicKeySubmit()
    }, [magicKeys])

    const isValidEmail = (email: string) => {
        return constants.EMAIL_PATTERN_REGEX.test(email);
    };

    const handleKeyChange = (i: number, value: string) => {
        setMagicKeys(magicKeys.map((e, index) => i === index ? value.slice(-1).toLocaleUpperCase() : e))
        const next = value === "" ? i - 1 : i + 1
        if (inputRefs.current[next]) inputRefs.current[next].focus();
    }

    const handlePasteData = (value: string) => {
        const values = value.split("")
        setMagicKeys(values)
        const next = values.length
        if (inputRefs.current[next]) inputRefs.current[next].focus();
    }

    return (
        <Modal title="Sign In to continue" closeButton onClose={handleClose} isOpen={isOpenSignIn} setIsOpen={setIsOpenSignIn} maxWidth='25rem'>
            {!isMailSent && (
                <div className="flex flex-col gap-3 pb-5">
                    <input
                        type="text"
                        placeholder="Email Address"
                        className="input input-bordered w-full"
                        disabled={isLoading}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div className="text-xs text-base-content/75">
                        A confirmation link with magic token will be sent in your email
                    </div>
                    <div className="flex gap-3">
                        <button className="btn btn-info flex-1" disabled={isLoading} onClick={handleEmailSubmit}>
                            {isLoading && (
                                <div className="loading h-5 w-5" />
                            )}
                            Send OTP
                        </button>
                        <button className="btn btn-info btn-square" disabled={isLoading || !isValidEmail(email)} onClick={goNext}>
                            <ChevronRightIcon className='h-5 w-5' />
                        </button>
                    </div>
                </div>
            )}
            {isMailSent && (
                <div className="flex flex-col gap-3 pb-5">
                    <div className="flex gap-1.5" onPaste={e => handlePasteData((e.clipboardData.getData("Text")))}>
                        {[...Array(constants.AUTH_KEY_SIZE)].map((_, i) => (
                            <input
                                type="text"
                                className='input input-bordered w-10 px-1 text-center'
                                onChange={e => handleKeyChange(i, e.target.value)}
                                onKeyDown={e => { if (["Backspace", "Delete"].includes(e.key)) handleKeyChange(i, "") }}
                                onPaste={e => e.preventDefault()}
                                value={magicKeys[i]}
                                ref={el => inputRefs.current[i] = el}
                                key={i}
                            />
                        ))}
                    </div>
                    <div className="text-xs text-base-content/75">
                        Do not share this magic token with anyone. Keep it secret.
                    </div>
                    <div className="flex gap-3">
                        <button className="btn btn-info btn-square" disabled={isLoading} onClick={() => setIsMailSent(false)}>
                            <ChevronLeftIcon className='h-5 w-5' />
                        </button>
                        <button className="btn btn-info flex-1" disabled={isLoading} onClick={handleMagicKeySubmit}>
                            {isLoading && (
                                <div className="loading h-5 w-5" />
                            )}
                            Submit Key
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    )
}

export default SignInModal