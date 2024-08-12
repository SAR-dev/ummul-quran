import api from "./base";
import { DataResponseType } from "types/base";
import { ClassPlanListByMonthType, StudentAddType } from "types/student";
import { ClassPlanType, StudentListType } from "types/teacher";

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

export const getStudentCompletedClassPlansByMonth = (id: number): Promise<ClassPlanListByMonthDataType> => {
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

export const getUpcomingClassPlansByStudentId = (id: number): Promise<UpcomingClassPlanListDataType> => {
    return api
        .get(`/students/${id}/class-plans/upcoming`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export interface StudentDataType {
    data: StudentListType
}

export const getStudentById = (id: number): Promise<StudentDataType> => {
    return api
        .get(`/students/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}