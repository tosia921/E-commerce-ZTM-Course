import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//logo icon
import { ReactComponent as Logo } from '../../assets/crown.svg'
// styles
import './header.styles.scss';
//firebase
import { auth } from '../../firebase/firebase.utils';
//custom components
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';



const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/shop'>CONTACT</Link>
            {
                currentUser ? (
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                ) : (
                <Link className='option' to='/signin'>SIGN IN</Link>)
            }
            <CartIcon/>
        </div>
        {hidden ? null : <CartDropdown/>}
    </div>
)

const mapStateToProps = ({user:{ currentUser}, cart:{hidden}}) => ({ // destructuring values from state, same as passing 'state' and then isnide the funcion typiny:  currentUser: state.user.currentUser, hidden: state.cart.hidden
    currentUser, 
    hidden
})

export default connect(mapStateToProps)(Header);