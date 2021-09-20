import React, { useEffect } from 'react';
import Background from './components/Background/Background';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom';
import Splash from './views/Splash/Splash';
import Modal from './components/Modal/Modal';
import { observer } from 'mobx-react-lite';
import { DeviceInfo } from './helpers/constants';
import { v4 as uuidv4 } from "uuid";
import NotFound from './views/NotFound/NotFound';
import Login from './views/Login/Login';
import NavBar from './components/NavBar/NavBar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './views/Home/Home';
import VideoPlayer from './views/VideoPlayer/VideoPlayer';

function App() {

  useEffect(() => {
    if(!DeviceInfo.Name) {
      DeviceInfo.Name = uuidv4();
    } else {
      console.log({...DeviceInfo});
    }
  }, [])

  return (
    <>
      <Background />
      <ToastContainer position="bottom-right" hideProgressBar theme="dark" autoClose={5000} style={{zIndex: 101}} />
      <Modal />
      <Switch>
        <Route path="/" exact component={Splash} />
        <Route exact path="/signIn" component={Login} />
        <Route
          path={'/(.+)'}
          render={() => (
            <>
              <NavBar />
              <Switch>
                <PrivateRoute path="/home" exact component={Home} />
                <PrivateRoute path="/movie/:id" exact component={VideoPlayer} />
                <Route component={NotFound} />
              </Switch>
            </>
          )}
        />
      </Switch>
    </>
  );
}

export default observer(App);
