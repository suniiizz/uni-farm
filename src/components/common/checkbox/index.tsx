import { useFormContext } from "react-hook-form";

type Props = React.ComponentPropsWithoutRef<"input"> & {
  registerName?: string;
  labelTitle?: string;
  onChangeCallBack?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const defaultStyle =
  "select-none relative cursor-pointer appearance-none h-6 w-6 border-none before:content-[''] before:w-6 before:h-6 before:block before:bg-center before:bg-contain before:bg-[url(../src/assets/icon/chk_1@2x.svg)] checked:before:bg-[url(../src/assets/icon/chk_1_on2@2x.svg)]";

const CheckBox = ({
  registerName,
  labelTitle,
  className,
  onChangeCallBack,
  ...props
}: Props) => {
  const { register } = useFormContext();

  if (!registerName) {
    return (
      <input
        type="checkbox"
        id={props.id}
        checked={props.checked}
        onChange={props.onChange}
        disabled={props.disabled}
        readOnly={props.readOnly}
        className={`${defaultStyle}`}
        value={props.value}
      />
    );
  }

  return (
    <>
      {onChangeCallBack || labelTitle ? (
        <label
          htmlFor={props.id}
          className={`text-white cursor-pointer text-[1rem] font-bold flex items-center gap-5 ${className ?? ""}`}
        >
          <input
            type="checkbox"
            id={props.id}
            checked={props.checked}
            disabled={props.disabled}
            readOnly={props.readOnly}
            className={`${defaultStyle}`}
            {...register(registerName, {})}
            onChange={onChangeCallBack}
          />
          {labelTitle}
        </label>
      ) : (
        <input
          type="checkbox"
          id={props.id}
          checked={props.checked}
          onChange={props.onChange}
          disabled={props.disabled}
          readOnly={props.readOnly}
          className={`${defaultStyle}`}
          value={props.value}
        />
      )}
    </>
  );
};

export default CheckBox;
