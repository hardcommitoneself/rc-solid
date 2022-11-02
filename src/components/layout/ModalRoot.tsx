import { Modal } from "~components/ui/Modal";
import { useModalContext } from "src/store/modal";
import { Show } from "solid-js";

const ModalRoot = () => {
  const [state, actions] = useModalContext();

  console.log(state);

  return (
    <>
      <Show when={state.isOpen}>
        <Modal title="test" subtitle="test sub title" />
      </Show>
    </>
  );
};

export default ModalRoot;
