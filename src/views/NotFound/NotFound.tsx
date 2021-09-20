import React from 'react';
import { observer } from 'mobx-react-lite';
import "./NotFound.css";
import BorderedContainer from '../../components/BorderedContainer/BorderedContainer';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();
  return (
    <div className="centerContainer">
      <BorderedContainer>
        <div className="centerContentContainer">
          <h2>
            404. Sorry!
          </h2>
          <h4>
            Page that you are looking for doesn't exist.
          </h4>
          <CustomButton
            text="Return to home page"
            onClick={() => history.push("/")}
          />
        </div>
      </BorderedContainer>
    </div>
  )
}

export default observer(NotFound);