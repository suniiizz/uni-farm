import React from "react";
// import { useFormContext } from "react-hook-form";

type Props = React.ComponentPropsWithoutRef<"input"> & {
  className?: string;
  inputWrap?: string;
  unit?: string;
  label?: string;
  registerName?: string;
  maxLength?: number;
};

const Input = ({ unit, label, maxLength, ...props }: Props) => {
  // const { register } = useFormContext();

  const inputWrap = `flex items-center justify-end gap-[.625rem] rounded-lg h-[2.8125rem] px-4 py-3 ${props.inputWrap ?? ""}`;
  const className = `flex items-center outline-0 border-none bg-inherit w-6 ${props.className ?? ""}`;

  // if (!registerName)
  //   return (
  //     <div className={inputWrap ?? ""}>
  //       <input {...props} className={className} />
  //     </div>
  //   );

  return (
    <>
      {label && (
        <span className="text-white font-bold text-[1.375rem] inline-block mb-3">
          {label}
        </span>
      )}
      <div className={inputWrap}>
        <input
          type="text"
          {...props}
          className={className}
          maxLength={maxLength}
          // {...register(registerName, {
          //   maxLength: maxLength && maxLength,
          // })}
        />
        {unit && (
          <span className="text-white font-bold text-[1.125rem]">{unit}</span>
        )}
      </div>
    </>
  );
};

const TimeInput = ({ maxLength, ...props }: Props) => {
  const inputWrap = `flex items-center ${props.inputWrap ?? ""}`;
  const className = `outline-0 border-none bg-inherit w-6 ${props.className ?? ""}`;

  return (
    <>
      <div
        className={`${inputWrap} rounded-lg bg-sub2 h-[2.8125rem] p-[.625rem] pr-[1.875rem] pl-[.875rem] text-white`}
      >
        <Input
          maxLength={maxLength}
          className={`${className} text-[1.375rem] font-bold`}
        />
        <span className="text-[1.375rem] font-bold">시</span>
        <Input
          maxLength={maxLength}
          className={`${className} text-[1.375rem] font-bold`}
        />
        <span className="text-[1.375rem] font-bold">분</span>
        <span className="inline-block ml-4">~</span>
        <Input
          maxLength={maxLength}
          className={`${className} text-[1.375rem] font-bold`}
        />
        <span className="text-[1.375rem] font-bold">시</span>
        <Input
          maxLength={maxLength}
          className={`${className} text-[1.375rem] font-bold`}
        />
        <span className="text-[1.375rem] font-bold">분</span>
      </div>
    </>
  );
};

export { Input, TimeInput };
