import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    _id: string;
    name: string;
    price: {
        original: number;
        discount: number;
    };
    quantity: number;
    quantityAddToCart: number;
    productTotalPrice: number;
}

interface CartState {
    quantity: number;
    products: Product[];
    totalPrice: number;
}

const initialState: CartState = {
    quantity: 0,
    products: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Increment cart quantity
        incrementQuantity: (state) => {
            state.quantity += 1;
        },
        // Decrease cart quantity
        decreaseQuantity: (state) => {
            if (state.quantity > 0) {
                state.quantity -= 1;
            }
        },
        // Delete specified quantity from cart
        deleteQuantity: (state, action: PayloadAction<number>) => {
            state.quantity = Math.max(state.quantity - action.payload, 0);
        },
        // Add product to cart
        addProductToCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            const existingProduct = state.products.find((p) => p._id === product._id);
            const productPrice = product.price.discount || product.price.original;

            if (existingProduct) {
                // Update existing product
                existingProduct.quantityAddToCart += product.quantityAddToCart;
                existingProduct.productTotalPrice = existingProduct.quantityAddToCart * productPrice;
            } else {
                // Add new product
                state.products.push({
                    ...product,
                    productTotalPrice: product.quantityAddToCart * productPrice,
                });
            }

            // Update cart quantity and total price
            state.quantity += product.quantityAddToCart;
            state.totalPrice += productPrice * product.quantityAddToCart;
        },
        // Update quantity of a specific product in the cart
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const product = state.products.find((item) => item._id === id);
            if (product) {
                const productPrice = product.price.discount || product.price.original;
                const quantityDifference = quantity - product.quantityAddToCart;

                product.quantityAddToCart = quantity;
                product.productTotalPrice = quantity * productPrice;

                // Update cart quantity and total price
                state.quantity += quantityDifference;
                state.totalPrice += quantityDifference * productPrice;
            }
        },
        // Recalculate total price and quantity from all products
        updateTotalPrice: (state) => {
            state.totalPrice = state.products.reduce(
                (total, item) =>
                    item.price.discount
                        ? total + item.price.discount * item.quantityAddToCart
                        : total + item.price.original * item.quantityAddToCart,
                0,
            );
            state.quantity = state.products.reduce((total, item) => total + item.quantityAddToCart, 0);
        },
        // Remove a product from the cart
        removeProduct: (state, action: PayloadAction<{ id: string }>) => {
            const productId = action.payload.id;
            const productToRemove = state.products.find((item) => item._id === productId);

            if (productToRemove) {
                // Update total price and quantity
                state.totalPrice -= productToRemove.productTotalPrice;
                state.quantity -= productToRemove.quantityAddToCart;

                // Remove the product from the list
                state.products = state.products.filter((item) => item._id !== productId);
            }
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
