import { toast, ToastOptions } from "react-toastify";

const defaultConfig: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  type: "default",
};

export const useToast = () => {
  const showToast = (message: string, config?: ToastOptions) => {
    toast(message, { ...defaultConfig, ...config });
  };

  return { showToast };
};
