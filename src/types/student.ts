import { ClassPlanType } from "./teacher";

export interface StudentAddType {
    student: {
        email: string;
        teachers_id: number;
        packages_id: number;
        class_link: string;
        price_bdt: number;
    },
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

export interface ClassPlanListByMonthType {
    year: number;
    month: number;
    class_plans: ClassPlanType[]
}