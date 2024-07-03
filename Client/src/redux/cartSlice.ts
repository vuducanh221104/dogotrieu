import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        quantity: 0,
        products: [],
        totalPrice: 0,
    },
    reducers: {
        incrementQuantity: (state) => {
            state.quantity += 1;
        },
        decreaseQuantity: (state) => {
            if (state.quantity > 0) {
                state.quantity -= 1;
            }
        },
        deleteQuantity: (state, action) => {
            if (action.payload >= state.quantity) {
                state.quantity = 0;
            } else {
                state.quantity -= action.payload;
            }
        },
        addProductToCart: (state: any, action) => {
            const product = action.payload;
            const existingProduct = state.products.find((p: any) => p._id === product._id);
            const productPrice = product.price.discount !== 0 ? product.price.discount : product.price.original;
            if (existingProduct) {
                existingProduct.quantityAddToCart += product.quantityAddToCart;
                existingProduct.productTotalPrice = existingProduct.quantityAddToCart * productPrice;
            } else {
                state.products.push({
                    ...product,
                    quantityAddToCart: product.quantityAddToCart,
                    productTotalPrice: product.quantityAddToCart * productPrice,
                });
            }
            state.quantity += product.quantityAddToCart;
            state.totalPrice += productPrice * product.quantityAddToCart;
        },
        updateQuantity: (state: any, action) => {
            const { id, quantity } = action.payload;
            const product = state.products.find((item: any) => item._id === id);
            if (product) {
                const productPrice = product.price.discount !== 0 ? product.price.discount : product.price.original;
                product.quantityAddToCart = quantity;
                product.productTotalPrice = quantity * productPrice;
            }
        },
        updateTotalPrice: (state: any) => {
            state.totalPrice = state.products.reduce(
                (total: any, item: any) =>
                    item.price.discount !== 0
                        ? total + item.price.discount * item.quantityAddToCart
                        : total + item.price.original * item.quantityAddToCart,
                0,
            );
            state.quantity = state.products.reduce((total: any, item: any) => total + item.quantityAddToCart, 0);
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter((item: any) => item._id !== action.payload.id);
        },
    },
});

export const {
    incrementQuantity,
    decreaseQuantity,
    deleteQuantity,
    addProductToCart,
    updateQuantity,
    updateTotalPrice,
    removeProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
