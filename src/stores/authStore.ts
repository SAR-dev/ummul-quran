import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { constants } from './constantStore'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { CustomJwtPayload } from 'types/base'

type AuthStore = {
    token: string | null,
    setToken: (props: string | null) => void,
    isLoggedIn: () => boolean,
    getLoggedInUserId: () => number,
    getLoggedInUserRole: () => string | null | undefined,
    getLoggedInTeachersId: () => number | null | undefined,
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            token: null,
            setToken: (value: string | null) => {
                set(() => ({ token: value }))
            },
            isLoggedIn: () => {
                try {
                    const authToken = get().token;
                    if (!authToken) return false;
                    const decoded: JwtPayload = jwtDecode(authToken)
                    const now = Math.floor(Date.now() / 1000);
                    if (!decoded.exp || !decoded.iat) return false;
                    if (decoded.exp <= now) return false;
                    return true;
                } catch (error) {
                    return false;
                }
            },
            getLoggedInUserId: () => {
                try {
                    const authToken = get().token;
                    if (!authToken) return 0;
                    const decoded: CustomJwtPayload = jwtDecode(authToken)
                    const now = Math.floor(Date.now() / 1000);
                    if (!decoded.exp || !decoded.iat) return 0;
                    if (decoded.exp <= now) return 0;
                    return Number(decoded.sub);
                } catch (error) {
                    return 0;
                }
            },
            getLoggedInUserRole: () => {
                const authToken = get().token;
                if (!authToken) return null;
                const decoded: CustomJwtPayload = jwtDecode(authToken)
                const now = Math.floor(Date.now() / 1000);
                if (!decoded.exp || !decoded.iat) return null;
                if (decoded.exp <= now) return null;
                return decoded.role
            },
            getLoggedInTeachersId: () => {
                const authToken = get().token;
                if (!authToken) return null;
                const decoded: CustomJwtPayload = jwtDecode(authToken)
                const now = Math.floor(Date.now() / 1000);
                if (!decoded.exp || !decoded.iat) return null;
                if (decoded.exp <= now) return null;
                return Number(decoded.teachers_id)
            }
        }), {
        name: constants.JWT_AUTH_KEY,
        storage: createJSONStorage(() => localStorage),
    })
)