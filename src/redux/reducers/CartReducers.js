import * as actionTypes from '../constants/SaleConstants';
const initialState = {
  cartItems: [],
};
const CartReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case actionTypes.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.sku !== action.payload),
      };
    case actionTypes.ADD_ITEM_FROM_TEXTFIELD:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
export default CartReducers;
