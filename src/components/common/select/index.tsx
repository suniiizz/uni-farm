type Option = {
  [key: string]: string | number;
};

type Props = React.ComponentPropsWithoutRef<"select"> & {
  options: Option[];
};

const Select = ({ options, ...props }: Props) => {
  const style = `pl-[.625rem] pr-[.75rem] appearance-none bg-[url('./assets/icon/section-arw-down-white@3x.png')] bg-[length:16px] bg-no-repeat bg-[right_10px_center] text-white font-bold text-[1.125rem] w-[4.375rem] h-[2.8125rem] bg-sub2 rounded-lg ${props.className ?? ""}`;

  return (
    <>
      <select className={style} {...props}>
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
