import { useModalContext } from "src/store/modal";

interface ModalHeaderProps {
  title: string;
  subtitle?: string;
}

const ModalHeader = (props: ModalHeaderProps) => {
  const { title, subtitle } = props;
  const [, actions] = useModalContext();

  return (
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
        onClick={() => actions.closeModal()}
      >
        <path d="M6.707 18.707L12 13.414l5.293 5.293 1.414-1.414L13.414 12l5.293-5.293-1.414-1.414L12 10.586 6.707 5.293 5.293 6.707 10.586 12l-5.293 5.293z"></path>
      </svg>
    </div>
  );
};

export default ModalHeader;
