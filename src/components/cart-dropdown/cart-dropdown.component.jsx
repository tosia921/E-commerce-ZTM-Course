import React from 'react';
//react router dom
import { withRouter } from 'react-router-dom';
//custom components
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
//redux
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toogleCartHidden } from '../../redux/cart/cart.actions';
//reselect
import { createStructuredSelector } from 'reselect'; 
//styles
import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length ?
                (cartItems.map(cartItem => <CartItem key={CartItem.id} item={cartItem}/>)) : 
                (<span className='empty-message'>Your cart is empty </span>)

            }
        </div>
        <CustomButton onClick={() => 
            {history.push('/checkout');
             dispatch(toogleCartHidden()) // we dont have to create mapDispatchToProps if we just want to dispatch a single action, as connect gives us dipstach property
            }}>
        GO TO CHECKOUT
        </CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));
