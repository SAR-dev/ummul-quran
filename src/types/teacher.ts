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

interface Avatar {
    id: number;
    title: string;
    source_url: string;
    thumbnail_url: string;
    optimized_url: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
}

interface User {
    id: number;
    email: string;
    username: string;
    name: string;
    contact_no: string;
    contact_email: string;
    nick_name: string;
    gender: string;
    location: string;
    utc: number;
    whatsapp_no: string;
    role: "ADMIN" | "USER" | "OTHER"; // Modify as needed
    images_id: number;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    avatar: Avatar;
}

interface Pack {
    id: number;
    name: string;
    minutes: number;
    description: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
}

interface Student {
    user: User;
    pack: Pack;
    class_link: string;
}

export interface TeacherListType {
    user: User;
    students: Student[];
}
