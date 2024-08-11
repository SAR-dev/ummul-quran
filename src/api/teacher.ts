import { ClassPlanCreateType, StudentListType, TeacherAddType, TeacherListType } from "types/teacher";
import api from "./base";
import { DataResponseType } from "types/base";

export const addTeacher = (data: TeacherAddType): Promise<DataResponseType> => {
    return api
        .post("/admin/teachers", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export interface TeacherListDataType {
    data: TeacherListType[]
}

export const getTeachers = (): Promise<TeacherListDataType> => {
    return api
        .get("/admin/teachers")
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export interface StudentListDataType {
    data: StudentListType[]
}

export const getStudentsByTeacher = (): Promise<StudentListDataType> => {
    return api
        .get("/teacher/students")
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const createClassPlan = (data: ClassPlanCreateType): Promise<DataResponseType> => {
    return api
        .post("/teacher/class-plans", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}