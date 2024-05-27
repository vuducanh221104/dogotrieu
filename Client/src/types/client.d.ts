interface IMenuPanel {
    id: number;
    title: string;
    subMenu: {
        title: string;
        link: string;
    }[];
    height: number;
}

interface IProduct {
    id: string;
    name: string;
    image: string;
    price: number;
    price_discount: number | null;
    material: {
        name: string;
        material_type_id: {
            name: string;
        };
    };
    ship?: string | null;
    stock_quantity: number;
    tags: string[];
    category: string[];
    color?: string[];
    slug: string;
}

interface FilterItem {
    id: string;
    title: string;
    content: string[];
}
