import { twmClsx } from "@/util";
import { SvgLoader } from "../svgLoader";
import { ButtonProps } from "./type";

export const Button = ({
  title,
  type = "button",
  className,
  disabled,
  loading,
  ...props
}: ButtonProps) => {
  const isDisabled = loading || disabled;
  return (
    <button
      type={type}
      className={twmClsx(
        "w-full text-white bg-primary-600  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600  dark:focus:ring-primary-800",
        className,
        {
          "bg-blue-400 dark:bg-blue-500 cursor-not-allowed": isDisabled,
          "hover:bg-primary-700 dark:hover:bg-primary-700": !isDisabled,
        }
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && <SvgLoader />}
      {title}
    </button>
  );
};
