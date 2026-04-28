import {toast} from "react-toastify";
import {type Dispatch, type SetStateAction} from "react";

import {type IFileData, type IResponse} from "@/types";
import { fetchFn } from ".";

export interface IUploadFile {
  file: File | Blob;
  url: string;
  name?: string;
  fileName?: string;
  fileMaxSize?: number;
  onError?: (err: any) => void;
  onSuccess: (data: IFileData) => void;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  setUploadProgress?: Dispatch<SetStateAction<number>>;
}

export const uploadFile = async (
  {
    url,
    file,
    onError,
    onSuccess,
    name = "File",
    setIsUploading,
    fileMaxSize = 5,
    setUploadProgress,
    fileName = "file",
  }: IUploadFile): Promise<void> => {
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > fileMaxSize) {
    toast.error(`${name} size exceeds ${fileMaxSize} MB`);
    return;
  }

  const toastId = toast.loading(`${name} jo'natilmoqda...`);
  setIsUploading(true);

  try {
    const formData = new FormData();
    formData.append(fileName, file);

    const {data} = await fetchFn.post<IResponse<IFileData>>(url, formData, {
      onUploadProgress: ({total, loaded}) => {
        const progress = Math.round((loaded * 100) / (total ?? 0));
        if (setUploadProgress) setUploadProgress(progress);

        toast.update(toastId, {
          render: `${name} jo'natilmoqda: ${progress}%`,
          type: 'info',
          isLoading: true,
        });
      },
    });

    onSuccess(data?.data as IFileData);

    toast.update(toastId, {
      render: `${name} muvaffaqiyatli jo'natildi!`,
      type: 'success',
      isLoading: false,
      autoClose: 3000,
    });
  } catch (err: any) {
    console.error(err);

    toast.update(toastId, {
      render: `${name} jo'natishda xatolik bor: ${err?.message}`,
      type: 'error',
      isLoading: false,
      autoClose: 5000,
    });

    if (onError) onError(err);
  } finally {
    setIsUploading(false);
  }
};