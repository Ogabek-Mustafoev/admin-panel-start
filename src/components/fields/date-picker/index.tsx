import dayjs from "dayjs";
import { DatePicker as AntDatePicker, type DatePickerProps } from "antd";
import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IDatePicker<T extends FieldValues>
  extends
    UseControllerProps<T>,
    Omit<DatePickerProps, "defaultValue" | "name"> {
  label?: string;
}

export const DatePicker = <T extends FieldValues>(props: IDatePicker<T>) => {
  const { t } = useTranslation("errors");
  const {
    label,
    required,
    picker,
    format = "DD-MMM, YYYY",
    disabled,
    minDate,
    maxDate = dayjs(),
    ...args
  } = props;

  const {
    field,
    fieldState: { error },
  } = useController(args);

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
      <AntDatePicker
        {...field}
        size="large"
        picker={picker}
        format={format}
        className="w-full"
        minDate={minDate}
        maxDate={maxDate}
        defaultValue={dayjs()}
        placeholder="Sana tanlang"
        status={error?.message ? "error" : undefined}
        value={field.value ? dayjs(field.value as Date) : null}
        onChange={(date) => field.onChange(dayjs(date).format("YYYY-MM-DD"))}
      />
      {error?.message && (
        <p className="text-xs text-red-500">{t(error.message)}</p>
      )}
    </div>
  );
};
