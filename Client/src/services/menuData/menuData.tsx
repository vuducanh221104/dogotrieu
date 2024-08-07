import config from '@/config';
import { FilterItem, FooterMenu, MenuPanel, TaggedItem } from '@/types/client';

export const dataMenuNavBar: MenuPanel[] = [
    {
        id: 0,
        title: 'BÀN GHẾ',
        subMenu: [
            { title: 'Tất Cả Bàn Ghế', link: '/category/ban-ghe' },
            { title: 'Bàn Ghế Cafe', link: '/category/ban-ghe-cafe' },
            { title: 'Bàn Ghế Trang Điểm', link: '/category/ban-ghe-trang-diem' },
            { title: 'Bàn Ghế Làm Việc', link: '/category/ban-ghe-lam-viec' },
            { title: 'Bàn Ghế Ăn', link: '/category/ban-ghe-an' },
            { title: 'Bàn Ghế Trà', link: '/category/ban-ghe-tra' },
            { title: 'Bàn Ghế Sofa', link: '/category/ban-ghe-sofa' },
            { title: 'Bàn Ghế Đơn', link: '/category/ban-ghe-don' },
            { title: 'Bàn Ghế Trường Kỷ', link: '/category/ban-ghe-truong-ky' },
            { title: 'Bàn Ghế Khác', link: '/category/ban-ghe-khac' },
        ],
        height: 370,
    },
    {
        id: 1,
        title: 'TỦ',
        subMenu: [
            { title: 'Tất Cả Tủ', link: '/category/tu' },
            { title: 'Tủ Thờ', link: '/category/tu-tho' },
            { title: 'Tủ Bày Đồ', link: '/category/tu-bay-do' },
            { title: 'Tủ Chùa', link: '/category/tu-chua' },
            { title: 'Tủ Quần Áo', link: '/category/tu-quan-ao' },
            { title: 'Tủ Sách', link: '/category/tu-sach' },
            { title: 'Tủ Loại Khác', link: '/category/tu-loai-khac' },
        ],
        height: 210,
    },
    {
        id: 2,
        title: 'KỆ CŨ',
        subMenu: [
            { title: 'Tất Cả Kệ', link: '/category/ke' },
            { title: 'Kệ Trang Trí', link: '/category/ke-trang-tri' },
            { title: 'Kệ Sách', link: '/category/ke-sach' },
            { title: 'Kệ Tivi', link: '/category/ke-tivi' },
            { title: 'Kệ Loại Khác', link: '/category/ke-loai-khac' },
        ],
        height: 160,
    },
    {
        id: 3,
        title: 'GIƯỜNG',
        subMenu: [
            { title: 'Tất Cả Giường', link: '/category/giuong' },
            { title: 'Giường Cũ Xưa', link: '/category/giuong-cu-xua' },
            { title: 'Giường Hiện Đại', link: '/category/giuong-hien-dai' },
            { title: 'Giường Loại Khác', link: '/category/giuong-loai-khac' },
        ],
        height: 105,
    },
    {
        id: 4,
        title: 'TƯỢNG & TRANH',
        subMenu: [
            { title: 'Tất Cả Tượng & Tranh', link: '/category/tuong-va-tranh' },
            { title: 'Tượng Gỗ', link: '/category/tuong-go' },
            { title: 'Tượng Sứ', link: '/category/tuong-su' },
            { title: 'Tượng Đồng', link: '/category/tuong-dong' },
            { title: 'Tượng Đá', link: '/category/tuong-da' },
            { title: 'Tranh Gỗ Khảm Ốc', link: '/category/tranh-go-kham-oc' },
            { title: 'Tranh Sơn Mài', link: '/category/tranh-son-dau' },
            { title: 'Tranh Sơn Dầu', link: '/category/tranh-son-dau' },
            { title: 'Tranh Điêu Khắc', link: '/category/tranh-dieu-khac' },
            { title: 'Tượng Loại Khác', link: '/category/tuong-loai-khac' },
            { title: 'Tranh Loại Khác', link: '/category/tranh-loai-khac' },
        ],
        height: 355,
    },
    {
        id: 5,
        title: 'TRANG TRÍ & KHÁC',
        subMenu: [
            { title: 'Tất Cả Trang Trí & Khác', link: '/category/trang-tri-va-khac' },
            { title: 'Đồ Gốm Sứ', link: '/category/do-gom-su' },
            { title: 'Rương', link: '/category/ruong' },
            { title: 'Đèn Trần', link: '/category/den-tran' },
            { title: 'Đèn Ngủ', link: '/category/den-ngu' },
            { title: 'Khác', link: '/category/khac' },
        ],
        height: 180,
    },
];

export const dataFilterCategory: FilterItem[] = [
    {
        id: 1,
        title: 'KHẢ DỤNG',
        content: [
            {
                name: 'Quick Ship',
                slug: '1',
            },
        ],
    },
    {
        id: 2,
        title: 'CHẤT LIỆU',
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

export const footerMenuItems: FooterMenu[] = [
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

export const dataTaggedNews: TaggedItem[] | any = [
    {
        id: 1,
        title: 'Tất cả',
        url: 'all',
    },
    {
        id: 2,
        title: 'Khám Phá',
        url: 'kham-pha',
    },
    {
        id: 3,
        title: 'Đời Sống',
        url: 'doi-song',
    },
];
