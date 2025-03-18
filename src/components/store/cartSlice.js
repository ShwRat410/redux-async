import { createSlice } from "@reduxjs/toolkit";

const initialState={
    items:[],
    totalQuantity:0,
    changed:false
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        replaceCart(state,action){
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity
        },
        addItem(state,action){
            const item = action.payload;
            const existingItem = state.items.find((eachItem)=>eachItem.id===item.id);
            state.totalQuantity++
            state.changed=true
            if(!existingItem){
                state.items.push({
                    id:item.id,
                    price:item.price,
                    quantity:1,
                    totalPrice:item.price,
                    name:item.title
                })
            }else{
                existingItem.quantity++
                existingItem.totalPrice += item.price 
            }
        },
        removeItem(state,action){
            const id = action.payload
            const existingItem = state.items.find((eachItem)=>eachItem.id===id);
            state.totalQuantity--
            state.changed=true
            if(existingItem.quantity===1){
                state.items = state.items.filter((eachItem)=>eachItem.id!==id)
            }else{
                existingItem.quantity--
                existingItem.totalPrice -= existingItem.price 
            }
        }
    }
})

export const cartAction = cartSlice.actions;
export default cartSlice
// action and reducer