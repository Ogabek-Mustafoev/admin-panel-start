import isFunction from "lodash/isFunction";
import { useTranslation } from "react-i18next";
import { Input, InputNumber, type InputNumberProps, type InputProps, Space, TimePicker } from "antd";
import { type FieldValues, useController, type UseControllerProps } from "react-hook-form";
import dayjs from "dayjs";
import type { ReactNode } from "react";
import { FaCopy } from "react-icons/fa6";
import type { TNameField } from "@/schema";

interface IMainInput<T extends FieldValues> extends UseControllerProps<T> {
  max?: number;
  min?: number;
  label?: string;
  format?: string;
  onCopy?: (value: TNameField) => void;
  showFormat?: string;
  required?: boolean;
  disabled?: boolean;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  placeholder?: string;
  size?: InputProps["size"];
  setValue?: (val: any) => any;
  parser?: InputNumberProps["parser"];
  prefix?: InputNumberProps["prefix"];
  suffix?: InputNumberProps["suffix"];
  formatter?: InputNumberProps["formatter"];
  type?: "password" | "text" | "textarea" | "number" | "time" | "otp" | "email";
}

export const MainInput = <T extends FieldValues>(props: IMainInput<T>) => {
  const {
    max,
    min,
    size,
    type = "text",
    label,
    parser,
    suffix,
    prefix,
    required,
    disabled,
    addonAfter,
    onCopy,
    addonBefore,
    setValue,
    formatter,
    showFormat = "HH:mm",
    format = "HH:mm",
    placeholder,
    ...rest
  } = props;
  const { t } = useTranslation("errors");
  const {
    field,
    fieldState: { error },
  } = useController(rest);

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <Input.TextArea
            status={error?.message ? "error" : undefined}
            {...field}
            size={size}
            autoSize={{ minRows: min ?? 4, maxRows: max ?? 4 }}
            disabled={disabled}
            placeholder={placeholder}
          />
        );
      case "password":
        return (
          <Input.Password
            status={error?.message ? "error" : undefined}
            {...field}
            size={size}
            disabled={disabled}
            placeholder={placeholder}
          />
        );
      case "otp":
        return <Input.OTP status={error?.message ? "error" : undefined} {...field} size={size} disabled={disabled} />;
      case "number":
        return (
          <InputNumber
            {...field}
            max={max}
            min={min ?? 0}
            size={size}
            parser={parser}
            prefix={prefix}
            suffix={suffix}
            disabled={disabled}
            className="w-full"
            formatter={formatter}
            placeholder={placeholder}
            status={error?.message ? "error" : undefined}
            onChange={value => {
              if (isFunction(setValue)) {
                field.onChange(setValue(value));
              } else {
                field.onChange(value);
              }
            }}
          />
        );
      case "time":
        return (
          <TimePicker
            {...field}
            size={size}
            format={showFormat}
            className="w-full"
            disabled={disabled}
            placeholder={placeholder}
            status={error?.message ? "error" : undefined}
            value={field?.value ? (format ? dayjs(field?.value, format) : dayjs(field?.value)) : undefined}
            onChange={time => {
              if (format) {
                field.onChange(time?.format(format));
              } else {
                field.onChange(time?.toISOString());
              }
            }}
          />
        );
      default:
        return (
          <Input
            {...field}
            size={size}
            prefix={prefix}
            disabled={disabled}
            placeholder={placeholder}
            status={error?.message ? "error" : undefined}
            onChange={({ target }) => {
              if (isFunction(setValue)) {
                field.onChange(setValue(target?.value));
              } else {
                field.onChange(target?.value);
              }
            }}
          />
        );
    }
  };

  const handleCopy = () => {
    const langDada: TNameField = {
      uz: field?.value,
      ru: field?.value,
      en: field?.value,
    };
    if (isFunction(onCopy)) {
      onCopy(langDada);
    }
  };

  return (
    <div>
      {label && (
        <p className={`${disabled && "cursor-not-allowed opacity-50"} mb-1.5 font-medium`}>
          {label} {required && <span className="font-bold text-red-500">*</span>}
        </p>
      )}
      {onCopy ? (
        <Space.Compact block size={size}>
          {addonBefore && <Space.Addon className="font-semibold">{addonBefore}</Space.Addon>}
          {renderInput()}
          <Space.Addon
            role="button"
            onClick={handleCopy}
            className="bg-primary! flex cursor-pointer items-center justify-center transition-all duration-100 active:scale-95"
          >
            <FaCopy />
          </Space.Addon>
        </Space.Compact>
      ) : addonBefore && addonAfter ? (
        <Space.Compact block size={size}>
          <Space.Addon className="font-semibold">{addonBefore}</Space.Addon>
          {renderInput()}
          <Space.Addon className="font-semibold">{addonAfter}</Space.Addon>
        </Space.Compact>
      ) : addonBefore ? (
        <Space.Compact block size={size}>
          <Space.Addon className="font-semibold">{addonBefore}</Space.Addon>
          {renderInput()}
        </Space.Compact>
      ) : addonAfter ? (
        <Space.Compact block size={size}>
          {renderInput()}
          <Space.Addon className="font-semibold">{addonAfter}</Space.Addon>
        </Space.Compact>
      ) : (
        renderInput()
      )}
      {error?.message && <p className="text-xs text-red-500">{t(error.message)}</p>}
    </div>
  );
};
