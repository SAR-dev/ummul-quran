import { UserType } from "./user";

export interface TeacherAddType {
    email: string;
    user: {
        name?: string;
        images_id?: number;
        contact_no?: string;
        contact_email?: string;
        nick_name?: string;
        gender?: string;
        location?: string;
        utc?: number;
        whatsapp_no?: string;
    }
}

interface Pack {
    id: number;
    name: string;
    minutes: number;
    description: string;
    created_at: Date;
    updated_at: Date;
}

interface Student {
    students_id: number;
    user: UserType;
    pack: Pack;
    class_link: string;
}

export interface TeacherListType {
    teachers_id: number;
    user: UserType;
    students: Student[];
}

export interface StudentListType {
    students_id: number;
    user: UserType;
    pack: Pack;
    class_link: string;
    teacher: UserType;
}