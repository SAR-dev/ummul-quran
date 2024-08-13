import { ClassPlanCreateType, ClassPlanListType, ClassPlanType, ClassPlanUpdateType, StudentListType, TeacherAddType, TeacherListType } from "types/teacher";
import api from "./base";
import { DataResponseType } from "types/base";
import { ClassPlanListByMonthDataType } from "./student";

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

export const updateClassPlan = (data: ClassPlanUpdateType): Promise<DataResponseType> => {
    return api
        .put("/teacher/class-plans", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export interface ClassPlanListDataType {
    data: ClassPlanListType
}

export const getCompletedClassPlans = (): Promise<ClassPlanListDataType> => {
    return api
        .get("/teacher/class-plans?finished=true")
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

export const getUpcomingClassPlansByTeacher = (): Promise<UpcomingClassPlanListDataType> => {
    return api
        .get("/teacher/class-plans/upcoming")
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export interface ClassPlanDataType {
    data: ClassPlanType
}

export const getClassPlanById = (id: number): Promise<ClassPlanDataType> => {
    return api
        .get(`/teacher/class-plans/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const startClassPlanById = (id: number): Promise<DataResponseType> => {
    return api
        .post(`/teacher/class-plans/${id}/start`, null)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const finishClassPlanById = (id: number): Promise<DataResponseType> => {
    return api
        .post(`/teacher/class-plans/${id}/finish`, null)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export interface TeacherDataType {
    data: TeacherListType
}

export const getTeacherById = (id: number): Promise<TeacherDataType> => {
    return api
        .get(`/teachers/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const getStudentsByTeacherId = (id: number): Promise<StudentListDataType> => {
    return api
        .get(`/teachers/${id}/students`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const getUpcomingClassPlansByTeacherId = (id: number): Promise<UpcomingClassPlanListDataType> => {
    return api
        .get(`/teachers/${id}/class-plans/upcoming`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const getTeacherCompletedClassPlansByMonth = (id: number): Promise<ClassPlanListByMonthDataType> => {
    return api
        .get(`/teachers/${id}/class-plans`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const deleteClassPlanById = (id: number): Promise<DataResponseType> => {
    return api
        .delete(`/teacher/class-plans/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}