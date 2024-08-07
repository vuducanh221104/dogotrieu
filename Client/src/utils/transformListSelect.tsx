export const transformListSelect = (data: any) => {
    return data.flatMap((item: any) => [
        {
            name: item.name, // Category name for searching
            label: item.name, // Category name for displaying
            value: item._id, // Category ID as value
        },
        ...item.children.map((child: any) => ({
            name: child.name, // Child category name for searching
            label: child.name, // Child category name for displaying
            value: child._id, // Child category ID as value
        })),
    ]);
};
// export const transformListSelectDefault = (data: any) => {
//     return data.map((item: any, index: number) => ({
//         label: <span key={index}>{item.name}</span>,
//         title: item.name,
//         options: [
//             {
//                 label: <span>{item.name}</span>,
//                 value: item._id,
//             },
//             ...item.children.map((child: any) => ({
//                 label: <span>{child.name}</span>,
//                 value: child._id,
//             })),
//         ],
//     }));
// };

// export const transformParentListSelect = (data: any) => {
//     // Initialize options array with a null option
//     let options = [{ label: 'null', value: 'null' }];

//     // Map data to options array
//     options = [
//         ...options,
//         ...data.map((item: any, index: number) => ({
//             label: <span key={index}>{item.name}</span>,
//             value: item._id,
//         })),
//     ];

//     return options.map((option) => ({
//         label: option.label,
//         title: option.label,
//         options: [option],
//     }));
// };
