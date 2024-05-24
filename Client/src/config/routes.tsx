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
        category: '/category', //slug
        productDetail: '/products', //slug
        newsDetail: '/blogs/news', //slug
    },

    admin: {
        dashboard: '/admin/dashboard',
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

    pageCompany: {
        contact: '/pages/contact',
        aboutUs: '/pages/about',
        tradeIn: '/pages/trade',
    },
};

export default routes;
