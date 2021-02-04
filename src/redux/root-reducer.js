//redux
import { combineReducers } from 'redux';
//redux-persist
import { persistReducer } from 'redux-persist'; // importint persistReducer
import storage from 'redux-persist/lib/storage'; // telling redux persist that we want to se local storage as a default storage
//reducers
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = { //configurations for redux presist
    key: 'root', //at what point we want to start storing 
    storage, //tells what kind if storage we want to use
    whitelist: ['cart'] //array of any reducer we want to use, as string values
}

const rootReducer = combineReducers({ //set our combine reducer value to rootReducer variable
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});


export default persistReducer(persistConfig, rootReducer); // we export default persistReducer passing in our config and combinereducers passes to rootReducer variable