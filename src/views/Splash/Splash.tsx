import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import "./Splash.css";
import BorderedContainer from '../../components/BorderedContainer/BorderedContainer';
import { Link } from 'react-router-dom';
import { useStore } from '../../stores/store';
import Loading from '../../components/Loading/Loading';

const Splash = () => {
  const [loading, setLoading] = useState(true);
  const { userStore } = useStore();

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
          <h2>
            Welcome!
          </h2>
          {!loading && (
            userStore.isLoggedIn
            ? (
              <h4>
                Go to <Link to="/home">Home</Link>.
              </h4>
            )
            : (
              <h4>
                Please <Link to="/signIn">sign in</Link> to application.
              </h4>
            )
          )}
          <Loading
            show={loading}
          />
        </div>
      </BorderedContainer>
    </div>
  )
}

export default observer(Splash);