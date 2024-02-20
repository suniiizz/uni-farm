type Option = {
  [key: string]: string | number;
};

type Props = React.ComponentPropsWithoutRef<"select"> & {
  options: Option[];
  selectWrap?: string;
};

const Select = ({ options, selectWrap, ...props }: Props) => {
  const className = `${selectWrap ?? ""} pl-[.625rem] pr-[.75rem] appearance-none bg-[url('src/assets/icon/section-arw-down-white@3x.svg')] bg-[length:16px] bg-no-repeat bg-[right_10px_center] text-white font-bold text-[.9375rem] w-[4.375rem] h-[2.8125rem] bg-sub2 rounded-lg`;

  return (
    <>
      <select className={className} {...props}>
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
