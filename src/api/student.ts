import api from "./base";
import { DataResponseType } from "types/base";
import { StudentAddType } from "types/student";

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