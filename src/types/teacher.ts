import { PackageType } from "./package";
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
    last_class?: Date;
    next_class?: Date;
}

export interface ClassPlanCreateType {
    students_id: number;
    start_at: string;
    finish_at: string;
    topic: string;
    description: string;
    memo: string;
}

export interface ClassPlanListType {
    data: ClassPlanType[],
    page_no: number,
    page_size: number,
    has_prev: boolean,
    has_next: boolean,
    total_result: number,
    total_pages: number
}

export interface ClassPlanType {
    id: number;
    teachers_id: number;
    students_id: number;
    start_at: Date;
    finish_at: Date;
    topic: string;
    description: string;
    memo: string;
    completed: boolean;
    started: boolean;
    finished: boolean;
    student: UserType;
    teacher: UserType;
    pack: PackageType;
}