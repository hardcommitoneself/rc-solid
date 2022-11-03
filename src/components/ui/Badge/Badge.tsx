import type { JSX } from "solid-js";

interface BadgeProps extends JSX.HTMLAttributes<HTMLDivElement> {}

const Badge = (props: BadgeProps) => {
  const { children, ...rest } = props;
  return (
    <div
      class="text-white rounded-bl-md rounded-tr-md px-1 py-0.5 text-xs leading-none"
      {...rest}
    >
      {children}
    </div>
  );
};

export default Badge;
