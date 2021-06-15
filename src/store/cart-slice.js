import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items:[],
    totalQuantity: 0,
    totalPrice: 0,
    change:false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            state.change = true;
            const newItem = action.payload;
            const existingItem = state.items.find(item=>item.id === newItem.id);
            state.totalQuantity ++;
            if(!existingItem){
                state.items.push({
                    id:newItem.id,
                    price:newItem.price,
                    quantity:1,
                    totalPrice: newItem.price,
                    name:newItem.title 
                });
            } else{
                existingItem.quantity ++ ;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action){
            state.change = true;
            const id = action.payload;
            const existingItem = state.items.find(item=>item.id === id);
            state.totalQuantity --;
            if (existingItem.quantity === 1){
                state.items = state.items.filter(item=>item.id !== id);
            } else{
                existingItem.quantity --;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
});


export const cartActions = cartSlice.actions;

export default cartSlice;