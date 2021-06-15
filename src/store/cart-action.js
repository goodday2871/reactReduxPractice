import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
      const fetchData = async () => {
        const response = await fetch(
          'https://burger-builder-eb32e-default-rtdb.firebaseio.com/cart.json'
        );
        if(!response.ok){
            throw new Error('Could not fetch cart data');
        }
        const data = await response.json();
        return data
      };
      try{
        const cartData =  await fetchData();
        dispatch(cartActions.replaceCart({
            items: cartData.items || [],
            totalQuantity: cartData.totalQuantity
        }));
      }catch(error){
        dispatch(
            uiActions.showNotification({
                status: 'error',
                title: 'ERROR!',
                message: "Can't fetch your cart data!"
            })
        );  
      }
  }
};

export const sendCartData = (cart)=>{
    return async (dispatch)=>{
      dispatch(uiActions.showNotification({
          status: 'pending',
          title: 'sending...',
          message: 'Sending your cart data!'
        })
        );
      const sendingRequest = async()=>{
          const response = await fetch(
              'https://burger-builder-eb32e-default-rtdb.firebaseio.com/cart.json',
              {
                  method:'PUT',
                  body:JSON.stringify({
                      items:cart.items,
                      totalQuantity:cart.totalQuantity
                  })
              }
          );
      
          if(!response.ok){
              throw new Error('Sending cart data fail.');
          }
      }
      
      try{
          await sendingRequest();
      }catch(error){
          dispatch(
              uiActions.showNotification({
                  status: 'error',
                  title: 'ERROR!',
                  message: "Can't Send your cart data!"
              })
          );   
      }
  
      dispatch(
          uiActions.showNotification({
              status: 'success',
              title: 'Success...',
              message: 'Sending your cart data Successfully!'
          })
      );
      
  
    }
};
