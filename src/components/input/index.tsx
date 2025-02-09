import { useId } from "react";

import { twmClsx } from "@/util";

interface InputProps {
  id?: string;
  label?: string;
  labelProps?: React.InputHTMLAttributes<HTMLLabelElement>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  errorMessage?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  labelProps,
  inputProps,
  errorMessage,
}) => {
  const fieldId = useId();
  const { className: labelClassName, ...restOfLabelProps } = labelProps ?? {};
  const { className: inputClassName, ...restOfInputProps } = inputProps ?? {};

  return (
    <div>
      {label && (
        <label
          htmlFor={id ?? fieldId}
          className={twmClsx(
            "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
            labelClassName,
            {
              "text-red-700 dark:text-red-500": errorMessage,
            }
          )}
          {...restOfLabelProps}
        >
          {label}
        </label>
      )}
      <input
        id={id ?? fieldId}
        className={twmClsx(
          "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          inputClassName,
          {
            "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500":
              errorMessage,
          }
        )}
        {...restOfInputProps}
      />
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
