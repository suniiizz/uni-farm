const Input = ({ ...props }) => {
  const className = `outline-0 border-none bg-inherit w-6 ${props.className ?? ""}`;

  return <input type="text" className={className} {...props} />;
};

const TimeInput = ({ ...props }) => {
  const inputWrap = `flex items-center gap-[.625rem]`;
  const className = `outline-0 border-none bg-inherit w-6 ${props.className ?? ""}`;

  return (
    <>
      <div
        className={`${inputWrap} rounded-lg bg-sub2 h-[2.8125rem] p-[.625rem] px-[1.875rem] text-white`}
      >
        <div className={`${inputWrap}`}>
          <div className="flex items-center gap-2">
            <Input className={`${className} text-[1.375rem] font-bold`} />
            <span className="text-[1.375rem] font-bold">시</span>
          </div>
          <div className="flex items-center gap-2">
            <Input className={`${className} text-[1.375rem] font-bold`} />
            <span className="text-[1.375rem] font-bold">분</span>
          </div>
        </div>
        <span>~</span>
        <div className={`${inputWrap}`}>
          <div className="flex items-center gap-2">
            <Input className={`${className} text-[1.375rem] font-bold`} />
            <span className="text-[1.375rem] font-bold">시</span>
          </div>
          <div className="flex items-center gap-2">
            <Input className={`${className} text-[1.375rem] font-bold`} />
            <span className="text-[1.375rem] font-bold">분</span>
          </div>
        </div>
      </div>
    </>
  );
};

export { Input, TimeInput };
