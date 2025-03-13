import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiAction } from '../store/uiSlice';

const CartButton = (props) => {

  const dispatch = useDispatch()
  const totalQuantity = useSelector((state)=>state.cart.totalQuantity) 

  function handleToggleCart(){
    dispatch(uiAction.toggle())
  }
  
  return (
    <button className={classes.button} onClick={handleToggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
