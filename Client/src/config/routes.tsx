const routes = {
    user: {
        home: '/',
        login: '/auth/login',
        recover: '/auth/recover',
        register: '/auth/register',
        // Routes Main
        search: '/search',
        cart: '/cart',
        news: '/blogs/news/tagged/all',
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
        // News
        blogsList: '/admin/news/list',
        // Home
        imageHomeBanner: '/admin/home/banner',
        imageHomeBannerMoblie: '/admin/home/bannerOnMobile',
        imageHomeCustomer: '/admin/home/customer',
        featuredProduct: '/admin/home/featuredProduct',
        featuredNews: '/admin/home/featuredNews',
        //Category
        categoryList: '/admin/category/list',
        //Material
        materialList: '/admin/material/list',
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

    domain: {
        name: 'https://dogotrieu.com',
        nameCamel: 'DOGOTRIEU.COM',
    },

    imgPromo: {
        navbar: '/category/all',
    },
    social: {
        facebook: 'https://www.facebook.com/I.Am.DucAnh123',
        instagram: 'https://www.instagram.com/daastore36',
        youtube: 'https://www.youtube.com/channel/UCDbSfGCcaBL27p2naz3DMVg',
        printerest: 'https://www.facebook.com/I.Am.DucAnh123',
        zaloChat: 'https://www.facebook.com/I.Am.DucAnh123',
        messagerChat: 'https://www.facebook.com/I.Am.DucAnh123',
        phone: 'tel:0348483612',
        mail: 'mailto:dogotrieu@gmail.com',
    },
};

export default routes;
