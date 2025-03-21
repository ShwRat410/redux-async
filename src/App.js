import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/UI/Notification';
import { sendCartData } from './components/store/cart-actions';
import { fetchCartData } from './components/store/cart-actions';

let initialState=true

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector((state) => state.ui.showCart)
  const cart = useSelector((state)=>state.cart)
  const notification = useSelector((state)=>state.ui.notification)

  useEffect(()=>{
    dispatch(fetchCartData());
  },[dispatch])

  useEffect(()=>{

    if(initialState){
      initialState=false
      return
    }

    if(cart.changed){
    dispatch(sendCartData(cart))
    }

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
