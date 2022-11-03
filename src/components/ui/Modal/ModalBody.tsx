import { JSX } from "solid-js";

interface ModalBodyProps {
  children: JSX.Element;
}

const ModalBody = (props: ModalBodyProps) => {
  const { children } = props;

  return <div class="flex w-full">{children}</div>;
};

export default ModalBody;
