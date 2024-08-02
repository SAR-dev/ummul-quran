import { PackageAddType, PackageType } from "types/package";
import api from "./base";
import { DataResponseType } from "types/base";

export const addPackage = (data: PackageAddType): Promise<DataResponseType> => {
    return api
        .post("/admin/packages", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export interface PackageListDataType {
    data: PackageType[]
}

export const getPackages = (): Promise<PackageListDataType> => {
    return api
        .get("/admin/packages")
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}