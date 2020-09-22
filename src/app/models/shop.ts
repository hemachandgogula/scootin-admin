export interface CountryDetails {
    id: number;
    name: string;
}

export interface StateDetails {
    id: number;
    name: string;
    countryDetails: CountryDetails;
}

export interface UserInfo {
    id: number;
    password: string;
    mobile_number: string;
    email: string;
    last_name: string;
    first_name: string;
    deleted: boolean;
    active: boolean;
    otp: string;
    otp_expire_time: any;
}

export interface Address {
    id: number;
    addressLine1: string;
    addressLine2: string;
    city: string;
    pincode: string;
    address_type: string;
    stateDetails: StateDetails;
    userInfo: UserInfo;
}

export interface CategoryDetails {
    name: string;
    description: string;
    active: boolean;
    deleted: boolean;
    id: number;
}

export interface PanReference {
    filename: string;
    type: string;
    url: string;
    deleted: boolean;
    id: number;
}

export interface GstInfoReference {
    filename: string;
    type: string;
    url: string;
    deleted: boolean;
    id: number;
}

export interface ShopOwner {
    first_name: string;
    email: string;
    mobile_number: string;
    password: string;
    aadhar_card: string;
    pan_card: string;
    active: boolean;
    deleted: boolean;
    id: number;
    last_name: string;
    panReference: PanReference;
    gstInfoReference: GstInfoReference;
}

export interface ServiceID {
    name: string;
    latitude: number;
    longitude: number;
    serviceRadius: number;
    deleted: boolean;
    id: number;
}

export interface ShopBannerReference {
    filename: string;
    type: string;
    url: string;
    deleted: boolean;
    id: number;
}

export interface Shop {
    name: string;
    openTime: string;
    closeTime: string;
    latitude: number;
    longitude: number;
    address: Address;
    categoryDetails: CategoryDetails;
    shopOwner: ShopOwner;
    createdAt: any;
    modified: any;
    status: boolean;
    discountType: string;
    amount: number;
    deleted: boolean;
    serviceID: ServiceID;
    id: number;
    shopBannerReference: ShopBannerReference;
}
