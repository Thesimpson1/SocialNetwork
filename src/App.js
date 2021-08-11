import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import s from './App.module.css';
import { initializedThunk } from './Redux/Reducer_App';
import Preloader from './Common/Preload/Preloader';
const Header = React.lazy(() => import('./Components/Header/Header'));
const Nav = React.lazy(() => import('./Components/Nav/Nav'));
const Login = React.lazy(() => import('./Components/Auth/Login/Login'));
const DialogsWithRedirect = React.lazy(() => import('./Components/Dialogs/Dialogs'));
const ProfileWithRedirect = React.lazy(() => import('./Components/Profile/Profile'));
const UsersContainer = React.lazy(() => import('./Components/Users/Users_Container'));

const App = (props) => {

  React.useEffect(() => {

    props.initializedThunk();

  }, []);

  if (!props.isInitialized) {
    return <Preloader />
  };
  
  return (
    <div className={s.App}>
      <Suspense fallback = {<div>Loading...</div>}>
       
      <Header />
      <div className = {s.wrapWeight}>
        <div className={s.startPage}>
          <Nav />
          <Route path='/dialogs' render={() => < DialogsWithRedirect />} />
          <Route path='/profile/:userId?' render={() => < ProfileWithRedirect />} />
          <Route path='/users' render={() => < UsersContainer />} />
          <Route path='/login' render={() => < Login />} />
        </div>
      </div>
      </Suspense>
    </div>
  )
};

let mapStateToProps = (state) => ({
  isInitialized: state.app.isInitialized,
});

export default connect(mapStateToProps, { initializedThunk })(App);

