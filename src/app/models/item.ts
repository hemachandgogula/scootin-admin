export interface Item {
    id: number;
    productImage: ProductImage;
    title: string;
    price: number;
    quantity: number;
    currentQuantity: number;
    description: string;
    active: boolean;
    shopManagement: ShopManagement;
    categoryDetails: CategoryDetails;
    serviceID: ServiceID;
}
export interface ProductImage {
    filename: string;
    type: string;
    url: string;
    deleted: boolean;
    id: number;
}

export interface CountryDetails {
    id: number;
    name: string;
}

export interface StateDetails {
    id: number;
    name: string;
    countryDetails: CountryDetails;
}

export interface Address {
    id: number;
    addressLine1: string;
    addressLine2: string;
    city: string;
    pincode: string;
    address_type: string;
    stateDetails: StateDetails;
}

export interface CategoryDetails {
    name: string;
    description: string;
    active: boolean;
    deleted: boolean;
    id: number;
}

export interface ShopOwner {
    last_name: string;
    first_name: string;
    email: string;
    mobile_number: string;
    password: string;
    aadhar_card: string;
    active: boolean;
    deleted: boolean;
    id: number;
}

export interface ServiceID {
    name: string;
    latitude: number;
    longitude: number;
    serviceRadius: number;
    deleted: boolean;
    id: number;
}

export interface ShopManagement {
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
}
