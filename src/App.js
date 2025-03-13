import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector,useDispatch } from 'react-redux';
import { uiAction } from './components/store/uiSlice';
import Notification from './components/UI/Notification';

let initialState=true

function App() {
  const showCart = useSelector((state) => state.ui.showCart)
  const cart = useSelector((state)=>state.cart)
  const notification = useSelector((state)=>state.ui.notification)
  const dispatch = useDispatch()

  useEffect(()=>{

    async function sendCartData (){

      dispatch(uiAction.showNotification({
        status:'pending',
        title:'Sending.......',
        message:"Sending cart data..."
      }))

      const response = await fetch("https://react-project-71169-default-rtdb.firebaseio.com/cart.json",{
        method:"PUT",
        body:JSON.stringify(cart)
      })

      if(!response.json()){
        throw new Error("Cannot update data")
      }

      dispatch(uiAction.showNotification({
        status:'success',
        title:'SUCCESS.......',
        message:"Sent cart data successfully..."
      }))
    }

    if(initialState){
      initialState=false
      return
    }

    sendCartData().catch((error)=>{
      dispatch(uiAction.showNotification({
        status:'error',
        title:'Error',
        message:"Sent cart data failed..."
      }))
    });

  },[cart,dispatch])

  return (
    <>
      {notification && <Notification 
        status={notification.status} 
        title={notification.title} 
        message={notification.message}>
      </Notification>
      }
        <Layout>
          {showCart &&<Cart />}
          <Products />
        </Layout>
    </>
  );
}

export default App;
