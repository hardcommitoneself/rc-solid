import type { JSX } from "solid-js";

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  leftEle?: JSX.Element;
  isError?: boolean;
  label?: JSX.Element;
  tooltip?: JSX.Element;
}

const Input = (props: InputProps) => {
  const { leftEle, isError = false, label, tooltip, ...rest } = props;

  return (
    <div class="flex flex-col w-full gap-1">
      {!!label && (
        <div class="flex justify-between">
          <span class="text-sm text-site-300 font-bold">{label}</span>
        </div>
      )}
      <div class="relative w-full">
        {leftEle && (
          <div class="absolute flex items-center left-2 h-full">{leftEle}</div>
        )}
        <input
          class="text-white w-full border border-site-600 bg-site-900 transition p-2 outline-none text-sm rounded"
          classList={{
            "focus:border-site-500": !isError,
            "pl-7": !!leftEle,
            "border-error-100": !!isError,
          }}
          {...rest}
        ></input>
      </div>
    </div>
  );
};

export default Input;
