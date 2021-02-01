import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

//Components Imports
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
//redux
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions' 

//Firebase
import { auth, createUserProfileDocument } from './firebase/firebase.utils'

class App extends React.Component {

  unsubscribeFromAuth = null 

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) { // userAuth is the object that come back from calling auth. if there is no logged iser comes back as null.
        const userRef = await createUserProfileDocument(userAuth); // this function adds our user to database and returns userRef object of the current user

        userRef.onSnapshot(snapShot => { // firebase method that listens to any changes to the user data, also gives back first state of that data
          setCurrentUser({ // updating state with snaphot.id and we spread any other data that we get from it
              id: snapShot.id,
              ...snapShot.data()
          })
          console.log(this.state)
        });
      } else { // is user auth is null, ex. if user signs out, we want to set state to null, which is equal to the userAuth value when there is no user signed in
        setCurrentUser(userAuth); 
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {

    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage/>) }/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps )(App);
