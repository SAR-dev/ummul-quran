import { JwtPayload } from "jwt-decode"

export interface DataResponseType {
    data: unknown
    error?: unknown
}

export interface CustomJwtPayload extends JwtPayload {
    role?: string;
    teachers_id?: string;
    students_id?: string;
}
