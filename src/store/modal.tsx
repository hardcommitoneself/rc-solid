import { createStore } from "solid-utils";

import { createMutable } from "solid-js/store";

export enum ModalName {
  COIN_FLIP = "coinflip",
  JACKPOT = "jackpot",
}
interface CoinFlipModal {
  name: ModalName;
  gameid?: number;
}

interface JackpotModal {
  name: ModalName;
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
export type { CoinFlipModal };
