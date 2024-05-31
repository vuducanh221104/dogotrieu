const routes = {
    user: {
        home: '/',
        login: '/auth/login',
        recover: '/auth/recover',
        register: '/auth/register',
        // Routes Main
        search: '/search',
        cart: '/cart',
        news: '/blogs/news',
        categoryInStock: '/category/in-stock',
        categoryAll: '/category/all',
        category: '/category', //slug
        productDetail: '/products', //slug
        newsDetail: '/blogs/news', //slug
    },

    admin: {
        dashboard: '/admin/dashboard',
        //Product
        productList: '/admin/product/list',
        productAdd: '/admin/product/add',
        productUpdate: '/admin/product/update',
        // Blogs
        blogsList: '/admin/blogs/list',
        blogsAdd: '/admin/blogs/add',
        // Home
        imageHomeBanner: '/admin/home/banner',
        imageHomeCustomer: '/admin/home/customer',
        featuredProduct: '/admin/home/featuredProduct',
        //Order
        orderList: '/admin/order/list',
        //User
        userList: '/admin/user/list',
        userAdd: '/admin/user/add',
    },

    pageCompany: {
        contact: '/pages/contact',
        aboutUs: '/pages/about',
        tradeIn: '/pages/trade',
    },

    social: {
        facebook: 'https://www.facebook.com/I.Am.DucAnh123',
        instagram: 'https://www.instagram.com/daastore36',
        youtube: 'https://www.youtube.com/channel/UCDbSfGCcaBL27p2naz3DMVg',
        printerest: 'https://www.facebook.com/I.Am.DucAnh123',
        zaloChat: 'https://www.facebook.com/I.Am.DucAnh123',
        phoneChat: 'https://www.facebook.com/I.Am.DucAnh123',
        messagerChat: 'https://www.facebook.com/I.Am.DucAnh123',
    },
};

export default routes;
