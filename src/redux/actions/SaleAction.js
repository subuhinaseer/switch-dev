import * as actionTypes from '../constants/SaleConstants';

export const CALCULATE_TOTAL_AMOUNT = 'CALCULATE_TOTAL_AMOUNT';
export const CALCULATE_DISCOUNT_AMOUNT = 'CALCULATE_DISCOUNT_AMOUNT';

export const selectCustomer = customer => ({
  type: actionTypes.SELECT_CUSTOMER,
  payload: customer,
});

export const calculateDiscount = discount => ({
  type: actionTypes.CALCULATE_DISCOUNT_AMOUNT,
  payload: discount,
});

export const calculateTotalAmountCash = amount => ({
  type: actionTypes.CALCULATE_TOTAL_AMOUNT,
  payload: amount,
});

export const addItemToSale = (productId, quantity) => ({
  type: actionTypes.ADD_ITEM_TO_SALE,
  payload: {productId, quantity},
});

export const updateItemQuantity = (productId, quantity) => ({
  type: actionTypes.UPDATE_ITEM_QUANTITY,
  payload: {productId, quantity},
});

export const removeItemFromSale = productId => ({
  type: actionTypes.REMOVE_ITEM_FROM_SALE,
  payload: productId,
});

export const addItemToCart = product => ({
  type: actionTypes.ADD_ITEM_TO_CART,
  payload: product,
});

export const removeItemFromCart = productId => ({
  type: actionTypes.REMOVE_ITEM_FROM_CART,
  payload: productId,
});
