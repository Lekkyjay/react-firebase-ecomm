import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';

import { auth, firestore, createUserProfileDocument } from './firebase/firebase.utils';

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  // let unsubscribeFromAuth = null

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        const userRef = await createUserProfileDocument(authUser)
        
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
          console.log('snapshotState:', currentUser);
        })
      } else { setCurrentUser(authUser) }
    })
    return () => {
      unsubscribeFromAuth();
      // userRef();
    }
  }, [])

  console.log('currentUser:', currentUser);

  // firestore.doc('/users/ppOIbTl4hXgjKxoRpxxM/cartItems/EseKQMXJcMjPzxZH3KzG')
  // firestore.collection('/users/ppOIbTl4hXgjKxoRpxxM/cartItems')
  // firestore
  //   .collection('users')
  //   .doc('ppOIbTl4hXgjKxoRpxxM')
  //   .collection('cartItems')
  //   .doc('EseKQMXJcMjPzxZH3KzG')

  return (
    <div>
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
