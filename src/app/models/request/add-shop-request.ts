
export interface Owner {
    last_name: string;
    first_name: string;
    email: string;
    mobile_number: string;
    password: string;
    banner_image: string;
    aadhar_card: string;
    pan_card: string;
    gst_info: string;
    city: string;
    fcm_id: string;
    active: boolean;
    deleted: boolean;
    id: number;
}

export interface Address {
    addressType: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    id: number;
    pincode: string;
    state_id: number;
    userInfoId: number;
}

export interface AddShopRequest {
    name: string;
    city: string;
    open_time: string;
    close_time: string;
    latitude: number;
    longitude: number;
    category_id: number;
    owner: Owner;
    address: Address;
}
