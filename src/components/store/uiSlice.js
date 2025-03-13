import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showCart:false
}

const uiSlice = createSlice({
    name:"ui",
    initialState:initialState,
    reducers:{
        toggle(state){
            state.showCart = !state.showCart
        }
    }
})

export const uiAction = uiSlice.actions;
export default uiSlice