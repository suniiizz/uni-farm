type Props = React.ComponentPropsWithoutRef<"input"> & {
  labelTitle?: string;
};

const defaultStyle =
  "select-none relative cursor-pointer appearance-none h-6 w-6 border-none before:content-[''] before:w-6 before:h-6 before:block before:bg-center before:bg-contain before:bg-[url(./assets/icon/chk_1@2x.png)] checked:before:bg-[url(./assets/icon/chk_1_on2@2x.png)]";

const CheckBox = ({ labelTitle, ...props }: Props) => {
  return (
    <>
      {labelTitle ? (
        <label
          htmlFor={props.id}
          className="text-white cursor-pointer text-[1rem] font-bold flex items-center gap-5"
        >
          <input
            type="checkbox"
            id={props.id}
            checked={props.checked}
            onChange={props.onChange}
            disabled={props.disabled}
            readOnly={props.readOnly}
            className={`${defaultStyle}`}
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
        />
      )}
    </>
  );
};

export default CheckBox;
