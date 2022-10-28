import type { JSX } from "solid-js";
import Loading from "../../util/Loading";

type ColorSchemeType = "green" | "orange";
type VaraintType = "solid" | "outline";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ColorSchemeType;
  varaint?: VaraintType;
  disabled?: boolean;
  loading?: boolean;
}

const colorSchemes = {
  green: {
    bgColor: "bg-gradient-to-t from-lime-700 to-lime-600",
    borderColor: "border-lime-500",
    hoverBgColor: "hover:from-lime-600 hover:to-lime-700",
    activeBgColor: "active:bg-none active:!bg-lime-400",
  },
  orange: {
    bgColor: "bg-gradient-to-t from-gradient-orange1 to-gradient-orange2",
    borderColor: "border-orange-500",
    hoverBgColor: "hover:from-gradient-orange2 hover:to-gradient-orange1",
    activeBgColor: "active:from-gradient-orange1 active:to-gradient-orange2",
  },
};

const variants = {
  solid: "",
  outline:
    "border-2 border-gray-500 !bg-none hover:!bg-gradient-to-b hover:border-none hover:px-4.5",
};

const StylizedButton = (props: ButtonProps) => {
  const {
    color = "green",
    varaint = "solid",
    disabled = false,
    loading = false,
    children,
    ...rest
  } = props;

  return (
    <button
      class="relative flex items-center select-none px-4 h-11 border-b-2 rounded-bl rounded-tr w-full text-sm text-white font-semibold max-w-fit uppercase tracking-wide"
      classList={{
        [colorSchemes[color].bgColor]: true,
        [colorSchemes[color].borderColor]: true,
        [variants[varaint]]: true,
        [colorSchemes[color].hoverBgColor]: !(disabled || loading),
        [colorSchemes[color].activeBgColor]: !(disabled || loading),
        "cursor-not-allowed hover:!bg-none hover:!border-solid hover:!px-4":
          (disabled || loading) && varaint === "outline",
        "cursor-not-allowed bg-none !bg-site-400 !border-site-350":
          (disabled || loading) && varaint === "solid",
        "opacity-30": loading,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <div class="absolute z-10 flex items-center justify-center inset-0">
          <Loading />
        </div>
      )}
    </button>
  );
};

export default StylizedButton;
