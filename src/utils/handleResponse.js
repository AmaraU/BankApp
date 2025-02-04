import { toast } from "react-hot-toast";

export const handleErrors = (error) => {
  if (typeof error == "string") {
    return toast.error(error);
  }
  if (error?.message) {
    return toast.error(error?.message);
  }
  if (error?.title) {
    return toast.error(error?.title);
  } else if (error?.result?.error?.validationMessages?.length > 0) {
    return error?.result.error.validationMessages.forEach((message) => {
      toast.error(message);
    });
  } else if (error?.result?.message) {
    return toast.error(error.result.message);
  } else if (error?.message) {
    return toast.error(error?.message);
  }
};

export const handleSuccess = (message) => {
  toast.success(message);
};
