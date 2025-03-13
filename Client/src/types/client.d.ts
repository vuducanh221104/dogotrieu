//Product
export interface Price {
    original: number;
    discount: number;
    discount_quantity: number;
    currency: string;
}

export interface Dimensions {
    width: number;
    height: number;
    length: number;
    unit: string;
}

export interface ProductType {
    _id: string;
    sku: string;
    description: string;
    tags: string[];
    dimensions: Dimensions;
    images: string[];
    created_at?: Date;
    update_at?: Date;
}

export interface Product {
    _id: string;
    product_type_id: string;
    name: string;
    price: Price;
    thumb: string;
    ship: number;
    quantity: number;
    material_id: string[];
    category_id: string[];
    created_at?: Date;
    updated_at?: Date;
}

export interface ProductDetail {
    _id: string;
    product_type_id: ProductType;
    name: string;
    price: Price;
    thumb: string;
    ship: number;
    quantity: number;
    material_id: string[];
    category_id: string[];
    created_at?: Date;
    updated_at?: Date;
}

//Category (Admin/User)
export interface Category {
    category_list: {}[];
    _id: string;
    name: string;
    slug: string;
    parent_id?: string | null;
    children: Material[];
}

//Material (Admin/User)
export interface Material {
    _id: string;
    name: string;
    slug: string;
    parent_id?: string | null;
    children: Material[] | [];
}

// Cart State
export interface CartProduct {
    _id: string;
    name: string;
    price: {
        original: number;
        discount: number;
    };
    quantity: number;
    quantityAddToCart: number;
    productTotalPrice: number;
}

export interface CartState {
    quantity: number;
    products: CartProduct[];
    totalPrice: number;
}

//Menu Data
export interface MenuPanel {
    id: number;
    title: string;
    subMenu: {
        title: string;
        link: string;
    }[];
    height: number;
}

export interface FilterItem {
    id: number;
    title: string;
    content: (
        | {
              name: string;
              slug: string;
          }
        | undefined
    )[];
}
[];

export interface FooterMenu {
    id: number;
    title: string;
    links?: {
        label: string;
        url: string;
    }[];
    classNameChild: string;
    height: string;
    content?: string;
}

export interface TaggedItem {
    id: number;
    title: string | null;
    url: string | null;
}

// Auth Types
export interface CurrentUser {
    _id: string;
    user_name: string;
    email: string;
    full_name: string;
    phone_number: string;
    role: number;
    type: 'WEBSITE' | 'GOOGLE';
    is_verified: boolean;
}

export interface AuthState {
    auth: {
        login: {
            currentUser: CurrentUser | null;
            isFetching: boolean;
            error: boolean;
        };
    };
}

// Form Values
export interface LoginFormValues {
    usernameOrEmail: string;
    password: string;
}

export interface ChangePasswordFormValues {
    oldPassword: string;
    password: string;
    confirmPassword: string;
}

export interface UpdateInfoFormValues {
    phoneNumber?: string;
    fullName?: string;
}

// API Response Types
export interface ApiResponse<T> {
    status: number;
    data: T;
    type?: string;
}

// Error Types
export interface ApiError {
    response?: {
        status: number;
        data?: {
            type?: string;
        };
    };
}

// Google OAuth Types
export interface GoogleCredentialResponse {
    credential?: string;
    select_by?: string;
}

// Cooldown Hook Types
export interface CooldownHook {
    cooldown: number;
    startCooldown: () => void;
    checkCooldown: () => boolean;
}

// Component Props Types
export interface AuthMessageNotificationProps {
    title: string;
    message?: string;
    subTitle: string;
    textButton: string;
    btnLinkTo?: string;
    iconHeader?: string;
}

export interface AuthSpinLoadingProps {
    loading: boolean;
}
interface ResetPasswordFormValues {
    password: string;
    confirmPassword: string;
}

interface RecoverFormValues {
    email: string;
}

interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Admin Auth Types
export interface AdminAuthState {
    adminAuth: {
        login: {
            currentUser: CurrentUser | null;
            isFetching: boolean;
            error: boolean;
        };
    };
}

export interface AdminLoginFormValues {
    usernameOrEmail: string;
    password: string;
}

// Admin User Types
export interface AdminUser {
    _id: string;
    user_name: string;
    email: string;
    full_name: string;
    phone_number: string;
    role: number;
    type: 'WEBSITE' | 'GOOGLE';
    is_verified: boolean;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface AdminUserFormValues {
    username: string;
    email: string;
    password: string;
    full_name: string;
    phone_number: string;
    role: number;
    status: number;
}

export interface AdminUserUpdateFormValues {
    full_name: string;
    phone_number: string;
    role: number;
    status: number;
}
