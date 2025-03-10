const routes = {
    user: {
        home: '/',
        login: '/auth/login',
        recover: '/auth/recover',
        register: '/auth/register',
        verifyEmail: '/auth/verifyEmail',
        info: '/auth/info',
        logout: '/auth/logout',
        changePasswordInfo: '/auth/info/changePassword',
        // Routes Main
        search: '/search',
        cart: '/cart',
        newsTaggedOnly: '/blogs/news/tagged',
        news: '/blogs/news/tagged/all',
        newsDetails: '/blogs/news',
        categoryInStock: '/category/in-stock',
        categoryAll: '/category/tat-ca-san-pham',
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
        //Auth
        login: '/admin/auth/login',
        logout: '/admin/auth/logout',
    },

    pageCompany: {
        contact: '/pages/contact',
        aboutUs: '/pages/about',
        tradeIn: '/pages/trade',
        privacy: '/privacy',
        terms: '/terms',
    },

    domain: {
        name: 'https://dogotrieu.com',
        nameCamel: 'DOGOTRIEU.COM',
    },

    imgPromo: {
        navbar: '/category/tat-ca-san-pham',
    },
    social: {
        facebook: 'https://www.facebook.com/profile.php?id=100032741172929',
        instagram: 'https://www.instagram.com/do_go_trieu_com/',
        youtube: 'https://www.youtube.com/channel/UChE61X--XCHDUkMhbIfTbEg/',
        printerest: 'https://www.pinterest.com/dogotrieu/',
        zaloChat: 'https://zalo.me/0348483612',
        messagerChat: 'https://m.me/100032741172929',
        phone: 'tel:0348483612',
        mail: 'mailto:dogotrieu@gmail.com',
    },
};

export default routes;
