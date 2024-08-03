import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'stores/authStore';
import AuthNavLayout from './AuthNavLayout';

const TeacherNavLayout = ({ children }: { children: ReactNode }) => {
    const { getLoggedInUserRole } = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (getLoggedInUserRole() != "TEACHER") {
            navigate(-1)
        }
    }, [getLoggedInUserRole, navigate])

    return (
        <AuthNavLayout>
            {children}
        </AuthNavLayout>
    )
}

export default TeacherNavLayout