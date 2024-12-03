type ProductExec = {
    _id: string | number;
    name: string;
    thumb: string;
    updated_at: Date;
    caption?: string;
};

interface NewsExec {
    _id: string;
    title: string;
    thumb: string;
    updated_at: string;
}
[];

interface CategoryExec {
    _id: string;
    slug: string;
    children: {
        slug: string;
    }[];
}
[];

//GET
export const productSITEMAP = async (): Promise<ProductExec[] | undefined> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/product/siteMap`).then((res) =>
            res.json(),
        );
        return res;
    } catch (error) {
        // console.error(err.response?.data);
    }
};

//GET
export const newsSITEMAP = async (): Promise<NewsExec[] | undefined> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/news/siteMap`).then((res) => res.json());
        return res;
    } catch (error) {
        // console.error(err.response?.data);
    }
};

//GET
export const categorySITEMAP = async (): Promise<CategoryExec[] | undefined> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/v1/category`).then((res) => res.json());
        return res.category_list;
    } catch (error) {
        // console.error(err.response?.data);
    }
};
