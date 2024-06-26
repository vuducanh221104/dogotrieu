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
