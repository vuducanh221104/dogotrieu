export const transformListSelect = (data: any) => {
    return data.map((item: any, index: number) => ({
        label: <span key={index}>{item.name}</span>,
        title: item.name,
        options: [
            {
                label: <span>{item.name}</span>,
                value: item._id,
            },
            ...item.children.map((child: any) => ({
                label: <span>{child.name}</span>,
                value: child._id,
            })),
        ],
    }));
};

export const transformListSelectDefault = (data: any) => {
    return data.map((item: any, index: number) => ({
        label: <span key={index}>{item.name}</span>,
        title: item.name,
        options: [
            {
                label: <span>{item.name}</span>,
                value: item._id,
            },
            ...item.children.map((child: any) => ({
                label: <span>{child.name}</span>,
                value: child._id,
            })),
        ],
    }));
};

export const transformParentListSelect = (data: any) => {
    // Initialize options array with a null option
    let options = [{ label: 'null', value: 'null' }];

    // Map data to options array
    options = [
        ...options,
        ...data.map((item: any, index: number) => ({
            label: <span key={index}>{item.name}</span>,
            value: item._id,
        })),
    ];

    return options.map((option) => ({
        label: option.label,
        title: option.label,
        options: [option], // Wrap each option in its own array as per the original structure
    }));
};
