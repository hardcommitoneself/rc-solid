import { JSX } from "solid-js";

interface ModalProps {
  children: JSX.Element;
}

const Modal = (props: ModalProps) => {
  const { children } = props;
  return (
    <div class="fixed left-0 top-0 overflow-y-auto w-full bg-site-950/80 z-50 h-screen">
      <div class="w-full z-50 relative bg-site-800 overflow-hidden rounded lg:w-[780px] lg:my-6 lg:mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Modal;
