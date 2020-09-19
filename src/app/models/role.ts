export interface Role {
    first_name: string;
    mobile_number: string;
    password: string;
    serviceID: ServiceID;
    role: string;
    email: string;
    deleted: boolean;
    id: number;
    last_name: string;
}
export interface ServiceID {
    name: string;
    latitude: number;
    longitude: number;
    serviceRadius: number;
    deleted: boolean;
    id: number;
}
