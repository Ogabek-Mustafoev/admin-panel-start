import { Image, Skeleton } from "antd";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { IoCloudUpload } from "react-icons/io5";
import { MdVideoLibrary } from "react-icons/md";
import playImg from "@/assets/images/play.png";
import type { IFileData } from "@/types";
import { uploadFile } from "@/utils/request/upload";
import { type FieldValues, useController, type UseControllerProps } from "react-hook-form";

interface IUploadImg<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  required?: boolean;
  className?: string;
  isVideo?: boolean;
}

export const UploadFile = <T extends FieldValues>(props: IUploadImg<T>) => {
  const { label, className, required, disabled, isVideo = false, ...rest } = props;
  const {
    field,
    fieldState: { error },
  } = useController(rest);
  const { t } = useTranslation();

  const [isUploading, setIsUploading] = useState(false);

  const onSuccess = (data: IFileData) => {
    field.onChange(data?.url);
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      void uploadFile({
        file,
        onSuccess,
        setIsUploading,
        fileMaxSize: 1000,
        url: "/upload",
      });
    }
  };

  const { getRootProps, getInputProps, isDragReject, isDragActive } = useDropzone({
    onDrop,
    disabled,
    multiple: false,
    accept: isVideo ? { "video/*": [".mp4", ".mov", ".avi"] } : { "image/*": [".jpeg", ".png", ".jpg"] },
  });

  useEffect(() => {
    if (isDragActive && isDragReject) {
      toast.error(
        isVideo
          ? "Iltimos .mp4, .mov yoki .avi formatdagi video yuklang!"
          : "Iltimos .jpeg, .png va .jpg formatdagi rasm yuklang!",
      );
    }
  }, [isDragReject, isDragActive, isVideo]);

  return (
    <div className={`${className} ${!label && "mt-3"}`}>
      {label && (
        <p className={`${disabled && "cursor-not-allowed opacity-50"} mb-1.5 font-medium`}>
          {label} {required && <span className="font-bold text-red-500">*</span>}
        </p>
      )}
      <div
        className={`${error?.message ? "border-red-500" : "border-neutral-300 dark:border-neutral-700"} ${
          disabled && "opacity-70"
        } flex h-28 items-center justify-between gap-2 rounded-lg border p-2`}
      >
        <div
          {...getRootProps()}
          className={`h-full flex-1 cursor-pointer rounded-md border-2 border-dashed text-center dark:border-neutral-500 ${
            isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <div className="m-auto mt-3 flex w-max flex-col items-center justify-center">
            <IoCloudUpload className="h-10 w-10 text-neutral-500 dark:text-neutral-400" />
            <p className="line-clamp-1 break-all">{t(isVideo ? "uploadVideo" : "uploadImg")}</p>
          </div>
        </div>
        {field.value ? (
          isVideo ? (
            <Image
              classNames={{ cover: "h-full w-auto" }}
              className="h-full! w-auto! invert dark:invert-0"
              preview={{
                destroyOnClose: true,
                imageRender: () => (
                  <video controls width="100%" src={field?.value} className="h-[90%] w-auto max-w-[90%]" />
                ),
                toolbarRender: () => null,
              }}
              src={playImg}
            />
          ) : (
            <Image classNames={{ root: "h-full! w-auto", image: "h-full! w-auto!" }} src={field?.value} />
          )
        ) : isVideo ? (
          <MdVideoLibrary className="h-full w-28 rounded-lg bg-neutral-200 p-6 text-neutral-500 dark:bg-neutral-800" />
        ) : (
          <Skeleton.Image active={isUploading} className="h-full" />
        )}
      </div>
      {error?.message && <p className="text-xs text-red-500">{t(error.message, { ns: "errors" })}</p>}
    </div>
  );
};
