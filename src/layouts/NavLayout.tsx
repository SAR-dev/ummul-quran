import { ReactNode, useEffect } from 'react';
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'stores/authStore';

const NavLayout = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate()
    const { isLoggedIn } = useAuthStore()

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/sign-in")
        }
    }, [isLoggedIn, navigate])

    return (
        <div className="min-h-screen w-full bg-base-100">
            <Navbar />
            {children}
        </div>
    )
}

export default NavLayout