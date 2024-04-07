import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

type Option = {
  [key: string]: string | number;
};

type Props = React.ComponentPropsWithoutRef<"select"> & {
  options: Option[];
  selectWrap?: string;
  registerName?: string;
  onChangeCallback?: (e?: ChangeEvent<HTMLInputElement>) => void;
};

const Select = ({
  options,
  selectWrap,
  registerName,
  onChangeCallback,
  ...props
}: Props) => {
  const { register } = useFormContext();

  const className = `${selectWrap ?? ""} pl-[.625rem] pr-[.75rem] appearance-none bg-[url('../src/assets/icon/section-arw-down-white@3x.svg')] bg-[length:16px] bg-no-repeat bg-[right_10px_center] text-white font-bold text-[.9375rem] w-[4.375rem] h-[2.8125rem] bg-sub2 rounded-lg`;

  if (!registerName) {
    return (
      <select className={className} defaultValue={""} {...props}>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.value} defaultValue={"선택"}>
              {option.name}
            </option>
          );
        })}
      </select>
    );
  }

  return (
    <>
      <select
        className={className}
        {...register(registerName, {
          onChange: onChangeCallback,
        })}
        {...props}
        defaultValue={0}
      >
        {options.map((option) => {
          return (
            <option key={option.id} value={option.value} defaultValue={"선택"}>
              {option.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
