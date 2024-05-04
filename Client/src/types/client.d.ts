interface IMenuPanel {
    id: number;
    title: string;
    subMenu: {
        title: string;
        link: string;
    }[];
    height: number;
}
