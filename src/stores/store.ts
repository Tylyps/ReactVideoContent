import { createContext, useContext } from "react";
import MediaListStore from "./mediaListStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store {
  userStore: UserStore;
  modalStore: ModalStore;
  mediaStore: MediaListStore;
}

export const store: Store = {
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  mediaStore: new MediaListStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
}