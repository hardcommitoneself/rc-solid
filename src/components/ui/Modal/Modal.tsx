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
    <Motion.div
      animate={{ opacity: [0, 1], transform: "translateY(-10px)" }}
      transition={{ duration: 0.3, easing: "ease-in-out" }}
      class="fixed left-0 top-0 overflow-y-auto w-full bg-site-950/80 z-50 h-screen"
      onClick={() => actions.closeModal()}
    >
      <div
        class="w-full relative bg-site-800 overflow-hidden rounded lg:w-195 lg:my-6 lg:mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </Motion.div>
  );
};

export default Modal;
