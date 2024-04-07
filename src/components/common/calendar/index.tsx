import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { DateFormatter, DayPicker } from "react-day-picker";
import { useFormContext } from "react-hook-form";

import "react-day-picker/dist/style.css";

import { Popover } from "@headlessui/react";

type Props = {
  placeholder?: string;
  inputClassName?: string;
  registerName?: string;
  requiredMessage?: string;
  disabledDate?:
    | Date
    | undefined
    | { from: Date | undefined; to: Date | undefined }[];
  wrapClassName?: string;
};

const Calendar = ({
  placeholder,
  inputClassName,
  registerName,
  disabledDate,
  wrapClassName,
}: Props) => {
  const [selected, setSelected] = useState<Date | undefined>();
  const { setValue, watch } = useFormContext();

  useEffect(() => {
    if (!registerName) return;
    setSelected(watch(registerName));
  }, [watch(registerName as string)]);

  return (
    <Popover>
      <style>{CSS}</style>
      <div className={`relative ${wrapClassName ?? "w-[8.75rem]"}`}>
        <Popover.Button className="flex flex-col gap-1 relative w-full p-0">
          <input
            readOnly
            type="text"
            placeholder={placeholder ?? "선택해주세요"}
            className={`${inputDefaultClassName} ${inputClassName}`}
            value={selected ? format(selected, "yyyy-MM-dd") : ""}
          />
          <span className="w-4 h-4 inline-block bg-[url('../src/assets/icon/date-icon.svg')] bg-no-repeat bg-center bg-contain absolute right-1 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0"></span>
        </Popover.Button>
        <Popover.Panel className="absolute top-[2.625rem] left-0 bg-white z-10 w-[15.625rem]">
          {({ close }) => (
            <DayPicker
              locale={ko}
              mode="single"
              selected={selected}
              onSelect={setSelected}
              formatters={{ formatCaption }}
              defaultMonth={selected}
              onDayClick={(day) => {
                if (registerName === "startDate" && watch("endDate")) {
                  if (new Date(day) > new Date(watch("endDate"))) {
                    alert(
                      `시작일이 종료일보다 빠를 수 없습니다. \n종료일을 다시 설정해주세요.`,
                    );
                  }
                }
                close();
                if (!registerName) return;
                setValue(registerName, day);
              }}
              disabled={disabledDate ? disabledDate : undefined}
            />
          )}
        </Popover.Panel>
      </div>
    </Popover>
  );
};

export default Calendar;

const formatCaption: DateFormatter = (date, options) =>
  format(date, "yyyy년 M월", { locale: options?.locale });

const inputDefaultClassName =
  "date-picker-input border border-white outline-0 placeholder:text-white py-2 px-4 w-full bg-mainButton/30 rounded-lg text-white text-sm";

const CSS = `
  .rdp {
    margin: 0;
  }
  .rdp-table{
    display:block;
    border:1px solid #dadada;
    border-top:none;
    padding:0.25rem 0.75rem;
    border-spacing: 1rem;
  }
  .rdp-caption { 
    background-color: #54524F;
    padding:0.438rem 0.8125rem;
  }
  .rdp-caption_label{
    font-size:0.938rem;
    color:#fff;
    font-weight: 400;
  }
  .rdp-nav{
    display:flex;
    align-items:center;
    gap:0.5rem;
  }
  .rdp-nav_button {
    padding: 0;
    width:fit-content;
    height:fit-content;
    &:hover{
      > svg {
        color:#273150;
      }
    }
    > svg {
      width:11px;
      height:11px;
      color:#fff;
    }
  }
  .rdp-head{
    .rdp-head_row{
      .rdp-head_cell{
        color:#222;
        font-weight:400;
        font-size:0.813rem;
      }
    }
  }
  .rdp-row{
    .rdp-cell{
      width:2rem;
      height:1.75rem;
      .rdp-day{
        width:100%;
        height:100%;
        font-size:0.8125rem;
        color:#222;
        &.rdp-day_selected{
          border-radius:4px;
          background-color:#E1DFDF;
          border:2px solid #C7C0BC 
        }
        &:hover {
          border-radius:4px;
          background-color:#E1DFDF;
          border:2px solid #C7C0BC 
        }
      }
      &:first-child {
        .rdp-day{
          color:#ed2024;
        }
      }
      &:last-child {
        .rdp-day{
          color:#237EDF;
        }
      }
    }
  }
`;
