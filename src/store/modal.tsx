import { createStore } from "solid-utils";

import { createMutable } from "solid-js/store";
interface CoinFlipModal {
  name: "coinflip";
  gameid: number;
  steamid: string;
}

interface JackpotModal {
  name: "jackpot";
}

type Modal = CoinFlipModal | JackpotModal;

type ModalState = {
  modal: Modal | null;
};

type Actions = {
  displayModal: (modal: Modal) => void;
  closeModal: () => void;
};

const [ModalProvider, useModalContext] = createStore<ModalState, Actions, {}>({
  state: () => ({
    modal: null,
  }),
  actions: (set) => ({
    displayModal(modal: Modal) {
      set("modal", modal);
    },
    closeModal() {
      set("modal", null);
    },
  }),
});

export { ModalProvider, useModalContext };