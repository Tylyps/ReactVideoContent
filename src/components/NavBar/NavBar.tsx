import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../stores/store';
import BorderedContainer from '../BorderedContainer/BorderedContainer';
import CustomButton from '../CustomButton/CustomButton';
import "./NavBar.css";

const NavBar = () => {
  const [isProfleOpen, setProfileOpen] = useState(false);
  const { userStore, modalStore } = useStore();

  const logoutModal = useMemo(() => {
    return (
      <div className="logoutModal">
        <h2>Are you sure you want to log out?</h2>
        <div>
          <CustomButton
            text="Cancel"
            borderColors={{
              firstBorderColor: "#f00",
              secondBorderColor: "#f00"
            }}
            onClick={() => modalStore.closeModal()}
          />
          <CustomButton
            text="Log out"
            borderColors={{
              firstBorderColor: "#0f0",
              secondBorderColor: "#0f0"
            }}
            onClick={() => {
              userStore.logout();
              modalStore.closeModal();
            }}
          />
        </div>
      </div>
    )
  }, [modalStore, userStore]);

  const logout = useCallback(() => {
    modalStore.openModal(logoutModal);
  }, [modalStore, logoutModal]);

  return (
    <div className="navbar">
      <nav>
        <NavLink exact to="/home">
          Home
        </NavLink>
      </nav>
      <div className={`profileMenu${isProfleOpen ? " active" : ""}`} onClick={() => setProfileOpen((open) => !open)}>
        Profile {userStore.user?.FullName}
        <div className="dropdownMenu">
          <BorderedContainer>
            <ul>
              <li onClick={() => alert("Available in premium version")}>
                Settings
              </li>
              <li onClick={logout}>
                Log out
              </li>
            </ul>
          </BorderedContainer>
        </div>
      </div>
    </div>
  )
}

export default observer(NavBar);