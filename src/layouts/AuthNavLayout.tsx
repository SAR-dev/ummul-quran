import { ReactNode, useEffect } from 'react';
import NavLayout from './NavLayout';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'stores/authStore';

const AuthNavLayout = ({ children }: { children: ReactNode }) => {
    const { isLoggedIn } = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/sign-in")
        }
    }, [isLoggedIn, navigate])

    return (
        <NavLayout>
            {children}
        </NavLayout>
    )
}

export default AuthNavLayout