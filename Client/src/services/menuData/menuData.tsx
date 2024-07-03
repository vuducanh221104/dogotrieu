import config from '@/config';

export const dataMenuNavBar: IMenuPanel[] = [
    {
        id: 0,
        title: 'BÀN GHẾ',
        subMenu: [
            { title: 'Tất Cả Bàn Ghế', link: '/category/ban-ghe' },
            { title: 'Bàn Ăn', link: '/category/ban-an' },
            { title: 'Bàn Trang Điểm', link: '/category/ban-trang-diem' },
            { title: 'Bàn Trà', link: '/category/ban-tra' },
            { title: 'Bàn & Ghế Làm Việc', link: '/category/ban-ghe-lam-viec' },
            { title: 'Ghế Đơn', link: '/category/ghe-don' },
            { title: 'Bàn & Ghế Trường Kỷ Cổ', link: '/category/ban-ghe-truong-ky' },
            { title: 'Bàn & Ghế Sofa', link: '/category/ban-ghe-sofa' },
        ],
        height: 190,
    },
    {
        id: 1,
        title: 'TỦ CŨ',
        subMenu: [
            { title: 'Tất Cả Tủ', link: '/category/tu' },
            { title: 'Tủ Thờ', link: '/category/tu-tho' },
            { title: 'Tủ Bày Đồ', link: '/category/tu-bay-do' },
            { title: 'Tủ Chùa', link: '/category/tu-chua' },
            { title: 'Tủ Quần Áo', link: '/category/tu-quan-ao' },
            { title: 'Tủ Sách', link: '/category/tu-sach' },
            { title: 'Tủ Loại Khác', link: '/category/tu-loai-khac' },
        ],
        height: 190,
    },
    {
        id: 2,
        title: 'KỆ CŨ',
        subMenu: [
            { title: 'Tất Cả Kệ', link: '/category/ke' },
            { title: 'Kệ Tivi', link: '/category/ke-tivi' },
            { title: 'Kệ Trang Trí', link: '/category/ke-trang-tri' },
            { title: 'Kệ Loại Khác', link: '/category/ke-loai-khac' },
        ],
        height: 150,
    },
    {
        id: 2,
        title: 'GIƯỜNG',
        subMenu: [
            { title: 'Tất Cả Giường', link: '/category/giuong' },
            { title: 'Giường Cũ Xưa', link: '/category/giuong-cu-xua' },
            { title: 'Giường Hiện Đại', link: '/category/giuong-hien-dai' },
        ],
        height: 70,
    },
    {
        id: 3,
        title: 'TƯỢNG & TRANH',
        subMenu: [
            { title: 'Tất Cả Tượng & Tranh', link: '/category/tuong-&-tranh' },
            { title: 'Tượng Gỗ', link: '/category/tuong-go' },
            { title: 'Tượng Sứ', link: '/category/tuong-su' },
            { title: 'Tượng Đồng', link: '/category/tuong-dong' },
            { title: 'Tượng Đá', link: '/category/tuong-da' },
            { title: 'Tranh Gỗ', link: '/category/tranh-go' },
            { title: 'Tranh Sơn Dầu', link: '/category/tranh-son-dau' },
            { title: 'Tranh Đá', link: '/category/tranh-da' },
        ],
        height: 150,
    },
    {
        id: 4,
        title: 'TRANG TRÍ & KHÁC',
        subMenu: [
            { title: 'Tất Cả Trang Trí & Khác', link: '/category/trang-tri-&-khac' },
            { title: 'Đồ Gốm', link: '/category/do-gom' },
            { title: 'Rương', link: '/category/ruong' },
            { title: 'Đèn Trần', link: '/category/den-tran' },
        ],
        height: 70,
    },
];
export const dataFilterCategory: any = [
    {
        id: '1',
        title: 'AVAILABILITY',
        content: [
            {
                name: 'Quick Ship',
                slug: '1',
            },
        ],
    },
    {
        id: '2',
        title: 'MATERIAL',
        content: [
            {
                name: 'Gỗ',
                slug: 'go',
            },
            {
                name: 'Kim loại:',
                slug: 'kim-loai',
            },
            ,
            {
                name: 'Đá và gốm sứ',
                slug: 'da-va-gom-su',
            },
            {
                name: 'Thủy tinh và pha lê',
                slug: 'thuy-tinh-va-pha-le',
            },

            {
                name: 'Nhựa',
                slug: 'nhua',
            },
        ],
    },
];

export const footerMenuItems = [
    {
        id: 0,
        title: 'Về Chúng Tôi',
        content:
            'Đồ Gỗ Triệu Cam Kết tự hào cam kết với bạn rằng mọi sản phẩm gỗ mà chúng tôi cung cấp đều được xây dựng trên nền tảng uy tín và chất lượng tối đa. Chúng tôi không chỉ là một cửa hàng, mà còn là một niềm tin, một sự đảm bảo về sự an tâm và hài lòng cho quý khách hàng.',
        classNameChild: 'text',
        height: '140px',
    },
    {
        id: 1,
        title: 'GIỚI THIỆU',
        links: [
            { label: 'Về Chúng Tôi', url: config.routesCompany.aboutUs },
            { label: 'Liên Hệ', url: config.routesCompany.contact },
        ],
        classNameChild: 'link',
        height: '60px',
    },
    {
        id: 2,
        title: 'KHÁM PHÁ',
        links: [
            { label: 'GIAO DỊCH', url: config.routesCompany.tradeIn },
            { label: 'TIN TỨC', url: config.routes.news },
        ],
        classNameChild: 'link',
        height: '60px',
    },
    {
        id: 3,
        title: 'ĐĂNG KÝ NHẬN TIN',
        content: 'Đăng ký nhận tin để nhận các ưu đãi độc quyền, bộ sưu tập mới, mẹo và nhiều hơn nữa',
        classNameChild: 'newsletter',
        height: '40px',
    },
];
