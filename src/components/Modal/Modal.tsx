import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import "./Modal.css";
import BorderedContainer from '../BorderedContainer/BorderedContainer';

const ModalContainer = () => {
  const { modalStore } = useStore();

  return (
    <div
      className={`modalContainer${modalStore.modal.open ? " active" : ""}`}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        (e.target as HTMLElement).classList.contains("modalContainer") && modalStore.closeModal()
      }}
    >
        <BorderedContainer>
          <div className="modalBody" onClick={(e) => e.preventDefault()}>
            {modalStore.modal.body}
          </div>
        </BorderedContainer>
    </div>
  )
}

export default observer(ModalContainer);