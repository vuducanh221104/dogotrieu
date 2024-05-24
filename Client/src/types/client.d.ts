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
    wood_type: string;
    ship?: string | null;
    stock_quantity: number;
    tags: string[];
    categories?: string[];
    color?: string[];
    slug: string;
}

interface FilterItem {
    id: string;
    title: string;
    content: string[];
}
