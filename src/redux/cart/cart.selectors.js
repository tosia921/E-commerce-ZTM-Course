import { createSelector } from 'reselect';

const selectCart = state => state.cart; // input selector, function that gets whole state and return just slice of it.

export const selectCartItems = createSelector( // writing a memoized selector thank tocreateSelector, takes 2 parameters, first is our selectCart, in this case it is array, second one is a function that will return value that we want to get from this selector.
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity , 0)
);