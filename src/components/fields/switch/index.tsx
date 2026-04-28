import { Switch } from "antd";
import { type FieldValues, useController, type UseControllerProps } from "react-hook-form";

interface ISwitch<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  required?: boolean;
  className?: string;
}

export const CustomSwitch = <T extends FieldValues>(props: ISwitch<T>) => {
  const { label, required, className, ...rest } = props;

  const {
    field,
    fieldState: { error },
  } = useController(rest);

  return (
    <div className={className}>
      {label && (
        <p className="mb-1.5 font-medium">
          {label} {required && <span className="font-bold text-red-500">*</span>}
        </p>
      )}
      <Switch {...field} />
      {error?.message && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
};
