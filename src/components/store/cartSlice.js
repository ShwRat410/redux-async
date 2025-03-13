import { createSlice } from "@reduxjs/toolkit";
import { uiAction } from "./uiSlice";

const initialState={
    items:[],
    totalQuantity:0,
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addItem(state,action){
            const item = action.payload;
            const existingItem = state.items.find((eachItem)=>eachItem.id===item.id);
            state.totalQuantity++
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
            if(existingItem.quantity===1){
                state.items = state.items.filter((eachItem)=>eachItem.id!==id)
            }else{
                existingItem.quantity--
            }
        }
    }
})

export const sendCartData = (cart) => {
    return async (dispatch)=>{
        dispatch(uiAction.showNotification({
            status:'pending',
            title:'Sending.......',
            message:"Sending cart data..."
          }))
          
          const sendRequest = async () => {
            const response = await fetch("https://react-project-71169-default-rtdb.firebaseio.com/cart.json",{
                method:"PUT",
                body:JSON.stringify(cart)
            })
              
            if(!response.json()){
                throw new Error("Sending cart data failed.")
            }
          }

          try{
            await sendRequest()
            dispatch(uiAction.showNotification({
                status:'success',
                title:'SUCCESS.......',
                message:"Sent cart data successfully..."
            }))
          }
          catch(error){
            dispatch(uiAction.showNotification({
                status:'error',
                title:'Error',
                message:"Sent cart data failed..."
              }))
          }



    }
}

export const cartAction = cartSlice.actions;
export default cartSlice
// action and reducer