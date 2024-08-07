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
