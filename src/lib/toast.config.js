import { addToast } from "@heroui/react";
export const showMessage = (title, status = 'primary',description = null) => {
    const toastData = {
      title: title,
      color: status,
      variant: "solid",
      placement: "bottom-right",
    };
    if (description) {
        toastData.description = description
    }
    addToast(toastData)
};
export const successMessage = (title, description = null) => {
    const toastData = {
        title: title,
        color: "success",
        variant: "solid",
        placement: "bottom-right",
    }
    if (description) {
        toastData.description = description
    }
    addToast(toastData)
};
export const errorMessage = (title, description = null) => {
    const toastData = {
        title: title,
        color: "danger",
        variant: "solid",
        placement: "bottom-right",
    }
    if (description) {
        toastData.description = description
    }
    addToast(toastData)
};
export const warningMessage = (title, description = null) => {
    const toastData = {
        title: title,
        color: "warning",
        variant: "solid",
        placement: "bottom-right",
    }
    if (description) {
        toastData.description = description
    }
    addToast(toastData)
};
