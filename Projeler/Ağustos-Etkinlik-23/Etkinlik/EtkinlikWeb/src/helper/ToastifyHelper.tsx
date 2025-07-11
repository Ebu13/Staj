// toastHelper.tsx
import { toast } from 'react-toastify';

export const showToast = (message: string, type: "info" | "success" | "warning" | "error" = "info") => {
  toast[type](message, {
    position: "top-right",
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
