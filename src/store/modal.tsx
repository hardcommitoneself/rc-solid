import { createStore } from "solid-utils";

interface CoinFlipModal {
  name: "coinflip";
  gameid: number;
}

interface JackpotModal {
  name: "jackpot";
}

type Modal = CoinFlipModal | JackpotModal;

type ModalState = {
  isOpen: boolean;
  modal: Modal | null;
};

type Actions = {
  displayModal: (modal: Modal) => void;
  closeModal: () => void;
};

const [ModalProvider, useModalContext] = createStore<ModalState, Actions, {}>({
  state: () => ({
    isOpen: false,
    modal: null,
  }),
  actions: (set) => ({
    displayModal(modal: Modal) {
      set("isOpen", true);
      set("modal", modal);
    },
    closeModal() {
      set("isOpen", false);
      set("modal", null);
    },
  }),
});

export { ModalProvider, useModalContext };
