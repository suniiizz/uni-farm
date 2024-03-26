import { useFormContext } from "react-hook-form";

type Props = React.ComponentPropsWithoutRef<"input"> & {
  className?: string;
  registerName: string;
  labelTitle?: string;
};

const Radio = ({ registerName, ...props }: Props) => {
  const { register } = useFormContext();

  return (
    <div
      className={`flex items-center justify-start gap-1.5 ${
        props.disabled ? "cursor-default" : "cursor-pointer"
      }`}
    >
      <input
        id={props.id}
        {...register(registerName, {})}
        className={`appearance-none relative ${
          props.disabled ? "cursor-default" : "cursor-pointer"
        } relative cursor-pointer h-6 w-6 border-none before:content-[''] before:w-6 before:h-6 before:block before:bg-center before:bg-contain before:bg-[url(src/assets/icon/chk_1@2x.svg)] checked:before:bg-[url(src/assets/icon/chk_1_on2@2x.svg)]`}
        type="radio"
        value={props.value}
        defaultChecked={props.defaultChecked}
        disabled={props.disabled}
      />
      {props.labelTitle && (
        <label
          htmlFor={props.id}
          className={`select-none ${
            props.disabled ? "cursor-default" : "cursor-pointer"
          }`}
        >
          {props.labelTitle}
        </label>
      )}
    </div>
  );
};

export default Radio;
