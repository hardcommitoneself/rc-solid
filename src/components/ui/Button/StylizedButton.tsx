import type { JSX } from "solid-js";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    color: 'green';
}

const StylizedButton = (props: ButtonProps) => {
    const {
        color,
        ...rest
    } = props;

    return (
        <button class="py-2 bg-gradient-to-br from-green-600 to-green-700 border-b-2 border-green-400 rounded-bl rounded-tr w-full text-sm text-gray-50 font-medium uppercase tracking-wide hover:from-green-700 hover:to-green-600" {...rest}>{props.children}</button>
    );
}

export default StylizedButton;