export interface PackageType {
    id: number;
    name: string;
    minutes: number;
    description: string;
    default_price: number;
}

export interface PackageAddType {
    name: string;
    minutes: number;
    description: string;
    default_price: number;
}