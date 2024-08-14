import { ReactNode, useEffect } from 'react';
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'stores/authStore';

const NavLayout = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate()
    const { getLoggedInUserRole, isLoggedIn, getLoggedInStudentsId } = useAuthStore()

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/sign-in")
        }
        if (isLoggedIn() && getLoggedInUserRole() == "ADMIN") {
            navigate("/admin")
        }
        if (isLoggedIn() && getLoggedInUserRole() == "STUDENT") {
            navigate(`/students/${getLoggedInStudentsId()}`)
        }
    }, [isLoggedIn, getLoggedInUserRole, getLoggedInStudentsId])

    return (
        <div className="min-h-screen w-full bg-base-100">
            <Navbar />
            {children}
        </div>
    )
}

export default NavLayout