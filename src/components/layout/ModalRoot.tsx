import { createMemo } from "solid-js";
import { useModalContext } from "src/store/modal";

// modals
import { JackpotModal, CoinflipModal } from "~components/modals";

const mapModals = {
  coinflip: CoinflipModal,
  jackpot: JackpotModal,
};

const ModalRoot = () => {
  const [state, actions] = useModalContext();

  const modal = createMemo(() => {
    if (!state.modal) {
      return null;
    }

    const Modal = mapModals[state.modal.name];

    return <Modal {...state.modal} />;
  });

  return <>{modal()}</>;
};

export default ModalRoot;
