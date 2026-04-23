import isFunction from "lodash/isFunction";
import { useTranslation } from "react-i18next";
import { Input, InputNumber, type InputNumberProps, type InputProps, TimePicker } from "antd";
import { type FieldValues, useController, type UseControllerProps } from "react-hook-form";
import dayjs from "dayjs";

interface IMainInput<T extends FieldValues> extends UseControllerProps<T> {
  max?: number;
  min?: number;
  label?: string;
  format?: string;
  showFormat?: string;
  required?: boolean;
  disabled?: boolean;
  addonBefore?: string;
  placeholder?: string;
  size?: InputProps["size"];
  setValue?: (val: any) => any;
  parser?: InputNumberProps["parser"];
  prefix?: InputNumberProps["prefix"];
  suffix?: InputNumberProps["suffix"];
  formatter?: InputNumberProps["formatter"];
  type?: "password" | "text" | "textarea" | "number" | "time" | "otp";
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
        return (
          <Input.OTP
            status={error?.message ? "error" : undefined}
            {...field}
            size={size}
            disabled={disabled}
          />
        );
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
            onChange={(value) => {
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
            value={
              field?.value
                ? format
                  ? dayjs(field?.value, format)
                  : dayjs(field?.value)
                : undefined
            }
            onChange={(time) => {
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

  return (
    <div>
      {label && (
        <p
          className={`${disabled && "cursor-not-allowed opacity-50"} mb-1.5 font-medium`}
        >
          {label}{" "}
          {required && <span className="font-bold text-red-500">*</span>}
        </p>
      )}
      {renderInput()}
      {error?.message && (
        <p className="text-xs text-red-500">{t(error.message)}</p>
      )}
    </div>
  );
};
