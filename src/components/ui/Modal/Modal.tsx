import { Accessor, JSX, Setter, Show } from "solid-js";

interface ModalProps {
  title: string;
  subtitle?: string;
  body?: JSX.Element;
  footer?: JSX.Element;
  isOpen: Accessor<boolean>;
  handleClose: (value: boolean) => Setter<boolean>;
}

const Modal = (props: ModalProps) => {
  const { title, subtitle, body, footer, isOpen, handleClose } = props;
  return (
    <Show when={isOpen()}>
      <div class="fixed left-0 top-0 overflow-y-auto w-full bg-site-950/80 z-50 h-screen">
        <div class="w-full z-50 relative bg-site-800 overflow-hidden rounded lg:w-[780px] lg:my-6 lg:mx-auto">
          {/* header */}
          <div class="relative flex items-center justify-between border-b-[1px] border-b-site-600 bg-gradient-to-b from-gradient-dark-gray-100 to-gradient-dark-gray-200">
            {/* title & subtitle */}
            <div class="flex items-center gap-5 pl-2.5">
              {/* title */}
              <span class="text-lg font-medium capitalize">{title}</span>
              {/* subtitle */}
              <span class="text-xs text-site-250">{subtitle}</span>
            </div>

            {/* close button */}
            <svg
              class="w-12 h-12 cursor-pointer ml-auto p-2.5"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              onClick={() => handleClose(false)}
            >
              <path d="M6.707 18.707L12 13.414l5.293 5.293 1.414-1.414L13.414 12l5.293-5.293-1.414-1.414L12 10.586 6.707 5.293 5.293 6.707 10.586 12l-5.293 5.293z"></path>
            </svg>
          </div>

          {/* body */}
          <div class="flex">{body}</div>

          {/* footer */}
          <div class="flex">{footer}</div>
        </div>
      </div>
    </Show>
  );
};

export default Modal;
