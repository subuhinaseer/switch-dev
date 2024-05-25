import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthReducers from '../reducers/AuthReducers';
import CartReducers from '../reducers/CartReducers';
import CustomerReducer from '../reducers/CustomerReducer';
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import {combineReducers} from 'redux';
import {thunk} from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};
const rootReducer = combineReducers({
  user: AuthReducers,
  cart: CartReducers,
  customer: CustomerReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
