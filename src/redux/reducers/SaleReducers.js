import {SELECT_CUSTOMER} from '../constants/SaleConstants';
const initialState = {
  customer: null,
};
const SaleReducers = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CUSTOMER:
      return {
        ...state,
        selectedCustomerId: action.payload,
      };
    default:
      return state;
  }
};
export default SaleReducers;
