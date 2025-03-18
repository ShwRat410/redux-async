import { uiAction } from "./uiSlice";
import { cartAction } from "./cartSlice";

export const fetchCartData = () => {
    return async (dispatch)=>{
        const fetchData = async () => {
            const response = await fetch("https://react-project-71169-default-rtdb.firebaseio.com/cart.json")
            if(!response.ok){
                throw new Error("Could not fetch cart data")
            }
            const resData = await response.json()
            return resData
        }
        try{
            const cartData = await fetchData()
            dispatch(cartAction.replaceCart({
                items:cartData.items||[],
                totalQuantity:cartData.totalQuantity,
            }))        
        }
        catch(error){
            dispatch(uiAction.showNotification({
                status:'error',
                title:'Error',
                message:"Sent cart data failed..." || error
              }))
        }
    }
}


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