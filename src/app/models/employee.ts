export interface PanReference {
    filename: string;
    type: string;
    url: string;
    deleted: boolean;
    id: number;
}

export interface Employee {
    firstName: string;
    lastName: string;
    email: string;
    description: string;
    mobileNumber: string;
    employeeStatus: string;
    modified: any;
    deleted: boolean;
    panNumber: string;
    panReference: PanReference;
    id: number;
}

