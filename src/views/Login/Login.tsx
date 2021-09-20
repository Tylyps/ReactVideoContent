import React, { useEffect, useState } from 'react';
import "./Login.css";
import BorderedContainer from '../../components/BorderedContainer/BorderedContainer';
import LoginForm from '../../components/Forms/Login/Login';
import RegisterForm from '../../components/Forms/Register/Register';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import Loading from '../../components/Loading/Loading';

const Login = () => {
  const [displayRegister, setDisplayRegister] = useState(false);
  const { userStore } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(userStore.hasValidToken && !userStore.isLoggedIn) {
      userStore.getUser().then(() => {
        setLoading(false);
      }, () => {
        userStore.setToken(undefined);
        setLoading(false);
      })
    } else {
      userStore.setToken(undefined);
      setLoading(false);
    }
  }, [userStore]);

  return (
    <div className="centerContainer">
      <BorderedContainer>
        <div className="centerContentContainer">
          {
            loading ? (
              <Loading />
            ) : (
              displayRegister
                ? (<RegisterForm toggleView={() => setDisplayRegister(false)} />)
                : (<LoginForm toggleView={() => setDisplayRegister(true)} />)
            )
          }
        </div>
      </BorderedContainer>
    </div>
  )
}

export default observer(Login);