import { makeAutoObservable, runInAction } from "mobx"

interface Modal {
  open: boolean;
  body?: JSX.Element;
}

export default class ModalStore {
  modal: Modal = {
    open: false,
    body: undefined,
  }

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (content: JSX.Element) => {
    this.modal.open = true;
    this.modal.body = content;
  }

  closeModal = () => {
    this.modal.open = false;
    setTimeout(() => {
      runInAction(() => {
        this.modal.body = undefined;
      })
    }, 500)
  }
}