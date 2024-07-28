import { UserType, UserUpdateType } from "types/user";
import api from "./base";
import { DataResponseType } from "types/base";

export interface UserDataType {
    data: UserType
}

export const getLoggedInUser = (): Promise<UserDataType> => {
    return api
        .get("/users/me")
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const updateLoggedInUser = (data : UserUpdateType ): Promise<DataResponseType> => {
    return api
        .put("/users/me", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}
