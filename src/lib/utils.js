import { errorMessage } from "./toast.config";

export const dateFormatter = (date, isTime = false) => {
  if (!date) return '';
  const formatterUS = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: isTime ? 'numeric' : undefined,
    minute: isTime ? 'numeric' : undefined
  });
  return formatterUS.format(new Date(date))
}

export const uploadFilesToServer = async (filesArray, removeUrls) => {
  if (!filesArray || filesArray.length === 0) return [];

  const formData = new FormData();

  filesArray?.forEach((fileObj) => {
    formData.append('files', fileObj.file); 
  });
  removeUrls?.forEach((i) => {
    formData.append('removeImageUrls', i);
  });
  try {
    const response = await fetch(`${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/uploadImages`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const result = await response.json();

    if (result.success && result.uploaded) {
      return result.uploaded; 
    } else {
      throw new Error(result.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Upload error:', error);
    errorMessage('Failed to upload files: ' + error.message);
    return [];
  }
};
