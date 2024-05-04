import React from 'react';

interface Props {
    value: number;
}

const FormatPrice: React.FC<Props> = ({ value }) => {
    const formattedPrice = () => {
        return value?.toLocaleString('vi-VN', {
            currency: 'VND',
        });
    };

    const formattedPriceString = formattedPrice();

    return <>{formattedPriceString + 'đ'}</>;
};

export default FormatPrice;
