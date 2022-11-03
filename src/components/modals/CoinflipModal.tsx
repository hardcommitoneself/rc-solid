import { Modal, ModalHeader } from "~components/ui/Modal";
import { useModalContext } from "src/store/modal";

interface CoinflipModalProps {
  name: string;
  steamid?: string;
  gameid?: number;
}

const CoinflipModal = (props: CoinflipModalProps) => {
  const [state, actions] = useModalContext();

  return (
    <Modal>
      <ModalHeader title="Test title"></ModalHeader>
    </Modal>
  );
};

const CoinflipModalBody = () => {};

export default CoinflipModal;
