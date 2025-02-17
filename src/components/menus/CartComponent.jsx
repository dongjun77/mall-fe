import React, { useEffect } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsAsync } from "../../slices/cartSlice";

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartSlice);

  useEffect(() => {
    if (isLogin) {
      dispatch(getCartItemsAsync());
    }
  }, [isLogin]);

  return (
    <div className="w-full">
      {isLogin ? (
        <div className="flex">
          <div className="m-2 font-extrabold">{loginState.nickname}'s Cart</div>
          <div
            className="bg-orange-600 w-9 text-center text-white font-bold
rounded-full m-2"
          >
            {cartItems.length}
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div>Cart</div>
    </div>
  );
};

export default CartComponent;
