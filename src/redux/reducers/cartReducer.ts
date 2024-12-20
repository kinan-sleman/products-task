// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsReducer';

interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.product.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1; 
            } else {
                state.items.push({ product: action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.product.id !== action.payload); 
        },
        updateQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
            const item = state.items.find(item => item.product.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;