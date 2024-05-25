import {
  SELECT_CUSTOMER,
  CALCULATE_TOTAL_AMOUNT,
  CALCULATE_DISCOUNT_AMOUNT,
} from '../constants/SaleConstants';
const initialState = {
  customer: null,
  totalAmount: 0.0,
  totalDiscount: 0.0,
};
const CustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
      };
    case CALCULATE_DISCOUNT_AMOUNT:
      return {
        ...state,
        totalDiscount: action.payload,
      };
    case CALCULATE_TOTAL_AMOUNT:
      return {
        ...state,
        totalAmount: action.payload,
      };

    default:
      return state;
  }
};
export default CustomerReducer;
