import { ReactNode, useEffect } from 'react';
import NavLayout from './NavLayout';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'stores/authStore';

const UnAuthNavLayout = ({ children }: { children: ReactNode }) => {
    const { isLoggedIn } = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn()) {
            navigate("/")
        }
    }, [isLoggedIn, navigate])

    return (
        <NavLayout>
            {children}
        </NavLayout>
    )
}

export default UnAuthNavLayout