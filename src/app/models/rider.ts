export interface AadharCardReference {
    deleted: boolean;
    filename: string;
    id: number;
    thumb: string;
    type: string;
    url: string;
}

export interface CountryDetails {
    id: number;
    name: string;
}

export interface StateDetails {
    countryDetails: CountryDetails;
    id: number;
    name: string;
}

export interface UserInfo {
    active: boolean;
    createdAt: number;
    deleted: boolean;
    email: string;
    fcmId: string;
    firstName: string;
    id: number;
    lastName: string;
    mobileNumber: string;
    modified: number;
    otp: string;
    otpExpireTime: number;
    password: string;
    profilePicture: string;
}

export interface Address {
    addressLine1: string;
    addressLine2: string;
    addressType: string;
    city: string;
    id: number;
    pincode: string;
    stateDetails: StateDetails;
    userInfo: UserInfo;
}

export interface DrivingLicenceReference {
    deleted: boolean;
    filename: string;
    id: number;
    thumb: string;
    type: string;
    url: string;
}

export interface PanCardReference {
    deleted: boolean;
    filename: string;
    id: number;
    thumb: string;
    type: string;
    url: string;
}

export interface ProfilePictureReference {
    deleted: boolean;
    filename: string;
    id: number;
    thumb: string;
    type: string;
    url: string;
}

export interface ServiceID {
    deleted: boolean;
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    serviceRadius: number;
}

export interface Rider {
    aadharCard: string;
    aadharCardReference: AadharCardReference;
    active: boolean;
    address: Address;
    deleted: boolean;
    drivingLicence: string;
    drivingLicenceReference: DrivingLicenceReference;
    email: string;
    fcmId: string;
    firstName: string;
    gender: string;
    id: number;
    lastName: string;
    latitude: number;
    longitude: number;
    mobileNumber: string;
    panCard: string;
    panCardReference: PanCardReference;
    password: string;
    profilePictureReference: ProfilePictureReference;
    serviceID: ServiceID;
}
