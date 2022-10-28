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
    bgColor: "bg-gradient-to-t from-[#a32301] to-[#fc3c01]",
    borderColor: "border-orange-500",
    hoverBgColor: "hover:from-[#fc3c01] hover:to-[#a32301]",
    activeBgColor: "active:from-[#a32301] active:to-[#fc3c01]",
  },
};

const variants = {
  solid: "",
  outline:
    "border-2 border-gray-500 !bg-none hover:!bg-gradient-to-b hover:border-hidden hover:mx-[2px]",
};

const StylizedButton = (props: ButtonProps) => {
  const {
    color = "green",
    varaint = "solid",
    disabled = false,
    loading = false,
    ...rest
  } = props;

  return (
    <button
      class={`flex items-center select-none px-4 h-11 ${
        colorSchemes[color].bgColor
      } border-b-2 ${
        colorSchemes[color].borderColor
      } rounded-bl rounded-tr w-full text-sm text-white font-semibold max-w-fit uppercase tracking-wide ${
        variants[varaint]
      } ${
        disabled || loading
          ? `cursor-not-allowed ${
              varaint === "outline"
                ? "hover:!bg-none hover:!border-solid hover:!mx-0 "
                : "bg-none !bg-site-400 !border-site-350"
            }`
          : " " +
            colorSchemes[color].hoverBgColor +
            " " +
            colorSchemes[color].activeBgColor
      }`}
      {...rest}
    >
      {loading ? <Loading /> : props.children}
    </button>
  );
};

export default StylizedButton;
