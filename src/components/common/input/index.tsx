import React from "react";
import { useFormContext } from "react-hook-form";

type Props = React.ComponentPropsWithoutRef<"input"> & {
  className?: string;
  inputWrap?: string;
  unit?: string;
  label?: string;
  registerName?: string;
  maxLength?: number;
  labelMarginNone?: boolean;
  disabled?: boolean;
  labelBlack?: boolean;
  fromTime?: string;
  fromMinute?: string;
  toTime?: string;
  toMinute?: string;
  readOnly?: boolean;
};

type Ref = {
  wrapperRef?: React.RefObject<HTMLDivElement>;
};

const Input = ({
  unit,
  label,
  maxLength,
  labelMarginNone,
  disabled,
  labelBlack,
  registerName,
  readOnly,
  ...props
}: Props) => {
  const { register } = useFormContext();

  const inputWrap = `flex items-center justify-end gap-1 rounded-lg h-[2.8125rem] px-3 py-2 ${props.inputWrap ?? ""} ${disabled && "bg-transparent border-2 border-[#54524F]"}`;
  const className = `flex items-center outline-0 border-none bg-inherit w-6 text-[.9375rem] placeholder:text-[.9375rem] ${props.className ?? ""}`;

  if (!registerName)
    return (
      <>
        {label && (
          <span
            className={`${labelBlack ? "text-black" : "text-white"} font-bold text-[1.125rem] inline-block ${!labelMarginNone ? "mb-2" : "mb-0"}`}
          >
            {label}
          </span>
        )}
        <div className={inputWrap ?? ""}>
          <input
            {...props}
            className={className}
            disabled={disabled}
            readOnly={readOnly}
          />
          {unit && <span className="text-white text-4">{unit}</span>}
        </div>
      </>
    );

  return (
    <>
      {label && (
        <span
          className={`${labelBlack ? "text-black" : "text-white"} font-bold text-[1.125rem] inline-block ${!labelMarginNone ? "mb-2" : "mb-0"}`}
        >
          {label}
        </span>
      )}
      <div className={inputWrap}>
        <input
          type="text"
          {...props}
          className={className}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          {...register(registerName, {
            maxLength: maxLength && maxLength,
          })}
        />
        {unit && <span className="text-white text-4">{unit}</span>}
      </div>
    </>
  );
};

const TimeInput = ({
  maxLength,
  fromTime,
  fromMinute,
  toTime,
  toMinute,
  onFocus,
  onBlur,
  wrapperRef,
  ...props
}: Props & Ref) => {
  const inputWrap = `flex items-center ${props.inputWrap ?? ""}`;
  const className = `outline-0 border-none bg-inherit w-6 ${props.className ?? ""}`;

  return (
    <>
      <div
        className={`${inputWrap} rounded-lg bg-sub2 h-[2.8125rem] p-[.625rem] pr-[1.875rem] pl-5 text-white`}
        ref={wrapperRef}
      >
        <Input
          registerName={fromTime}
          maxLength={maxLength}
          className={`${className} text-[1.375rem] font-bold`}
          inputWrap="pr-1 pl-2"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <span className="text-[1.375rem] font-bold">시</span>
        <Input
          registerName={fromMinute}
          maxLength={maxLength}
          className={`${className} text-[1.375rem] font-bold`}
          inputWrap="pr-1 pl-2"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <span className="text-[1.375rem] font-bold">분</span>
        <span className="inline-block ml-2">~</span>
        <Input
          registerName={toTime}
          maxLength={maxLength}
          className={`${className} text-[1.375rem] font-bold`}
          inputWrap="pr-1 pl-2"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <span className="text-[1.375rem] font-bold">시</span>
        <Input
          registerName={toMinute}
          maxLength={maxLength}
          className={`${className} text-[1.375rem] font-bold`}
          inputWrap="pr-1 pl-2"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <span className="text-[1.375rem] font-bold">분</span>
      </div>
    </>
  );
};

export { Input, TimeInput };
