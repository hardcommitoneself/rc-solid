import { JSX } from "solid-js";
import { Motion } from "@motionone/solid";
import { useModalContext } from "src/store/modal";

interface ModalProps {
  children: JSX.Element;
}

const Modal = (props: ModalProps) => {
  const { children } = props;
  const [, actions] = useModalContext();

  return (
    <div
      class="fixed left-0 top-0 overflow-y-auto w-full bg-site-950/80 z-50 h-screen"
      onClick={() => actions.closeModal()}
    >
      <div
        class="w-full z-[60] relative bg-site-800 overflow-hidden rounded lg:w-[780px] lg:my-6 lg:mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
