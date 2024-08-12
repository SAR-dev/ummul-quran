import api from "./base";
import { DataResponseType } from "types/base";
import { ClassPlanListByMonthType, StudentAddType } from "types/student";
import { ClassPlanType } from "types/teacher";

export const addStudent = (data: StudentAddType): Promise<DataResponseType> => {
    return api
        .post("/admin/students", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export interface ClassPlanListByMonthDataType {
    data: ClassPlanListByMonthType[]
}

export const getCompletedClassPlansByMonth = (id: number): Promise<ClassPlanListByMonthDataType> => {
    return api
        .get(`/students/${id}/class-plans`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export interface UpcomingClassPlanListDataType {
    data: ClassPlanType[]
}

export const getUpcomingClassPlansByStudent = (id: number): Promise<UpcomingClassPlanListDataType> => {
    return api
        .get(`/students/${id}/class-plans/upcoming`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}