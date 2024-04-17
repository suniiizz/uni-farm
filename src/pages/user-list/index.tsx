import { FormProvider, useForm } from "react-hook-form";

import { Input } from "@/components/common/input";
import Button from "@/components/common/button";
import Select from "@/components/common/select";
import TablePagination from "@/components/common/pagination";

const UserList = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <div className="m-6 bg-main rounded-[.625rem] h-[calc(100vh-6.75rem)]">
        {/* 상단 타이틀 */}
        <div className="h-[4.375rem] p-6 bg-main rounded-t-[.625rem] border-b border-mainLine flex justify-between items-center relative">
          <h2 className="text-[1.5rem] text-[#fff] font-bold">사용자 리스트</h2>
        </div>
        <div className="p-6">
          <div className="flex gap-2">
            <Select options={SORT_LIST} selectWrap="w-[6.25rem]" />
            <Select options={SEARCH_LIST} selectWrap="!w-[12.5rem]" />
            <Input
              inputWrap="w-[12.5rem] bg-sub2"
              className="font-bold w-full text-left text-white"
              placeholder="통합검색"
            />
            <Button
              customType="MODAL"
              className="!bg-[#293394] w-[5.625rem] gap-2 text-center relative pl-[1.875rem] pr-[.625rem]"
            >
              <span className="w-6 h-6 inline-block bg-[url('../src/assets/icon/search-icon@2x.svg')] bg-no-repeat bg-center bg-contain absolute top-[50%] translate-y-[-50%] left-2"></span>
              검색
            </Button>
            <Button customType="MODAL" className="!bg-[#85601F] w-[3.75rem]">
              등록
            </Button>
            <Button customType="MODAL" className="!bg-[#B94141] w-[3.75rem]">
              삭제
            </Button>
          </div>

          <div className="flex flex-col justify-center h-full mt-[1.875rem]">
            <table className="table-fixed border-spacing-0 border-collapse w-full border border-white text-[.8125rem]">
              <thead className="bg-bg2">
                <tr>
                  {TABLE_HEAD.map((value, id) => {
                    return (
                      <th
                        key={id}
                        className={`w-[${value.width}%] font-normal border p-3 whitespace-nowrap`}
                      >
                        <div className="flex justify-center items-center ">
                          {value.name}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="bg-red2">
                {TABLE_BODY.map((value, id) => {
                  return (
                    <tr key={id} className="text-center">
                      <td className="border p-[.625rem] h-[3.75rem]">
                        <div className="flex justify-center items-center h-full">
                          {value.chekbox}
                        </div>
                      </td>
                      <td className="border p-[.625rem] h-[3.75rem]">
                        {value.no}
                      </td>
                      <td className="border p-[.625rem] h-[3.75rem]">
                        {value.id}
                      </td>
                      <td className="border p-[.625rem] h-[3.75rem]">
                        {value.name}
                      </td>
                      <td className="border p-[.625rem] h-[3.75rem]">
                        {value.user}
                      </td>
                      <td className="border p-[.625rem] h-[3.75rem]">
                        {value.unit}
                      </td>
                      <td className="border p-[.625rem] h-[3.75rem]">
                        {value.num}
                      </td>
                      <td className="border p-[.625rem] h-[3.75rem]">
                        <div className="flex justify-center items-center h-full whitespace-normal">
                          {value.phone}
                        </div>
                      </td>
                      <td className="border p-[.625rem] h-[3.75rem]">
                        {value.register}
                      </td>
                      <td className="border p-[.625rem] h-[3.75rem]">
                        {value.date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-5 w-full flex justify-center">
              <TablePagination />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default UserList;

const SORT_LIST = [
  { id: 1, name: "최신순" },
  { id: 2, name: "글자순" },
];

const SEARCH_LIST = [{ id: 1, name: "권한전체" }];

const TABLE_HEAD = [
  { name: <input type="checkbox" className="w-4 h-4" />, width: "5" },
  { name: "NO", width: "5" },
  { name: "ID", width: "5" },
  { name: "성명", width: "10" },
  { name: "사용권한", width: "10" },
  { name: "농가수", width: "15" },
  { name: "재배동수", width: "15" },
  { name: "전화번호", width: "20" },
  { name: "등록일", width: "10" },
  { name: "유료 사용자 기간", width: "10" },
];

const TABLE_BODY = [
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "27",
    id: "test",
    name: "농성명",
    user: "농가사용자",
    unit: "3개소",
    num: "9",
    phone: "1234567890",
    register: "2023-10-30",
    date: "계약기간 : 2024-12-12",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "27",
    id: "test",
    name: "농성명",
    user: "농가사용자",
    unit: "3개소",
    num: "9",
    phone: "1234567890",
    register: "2023-10-30",
    date: "계약기간 : 2024-12-12",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "27",
    id: "test",
    name: "농성명",
    user: "농가사용자",
    unit: "3개소",
    num: "9",
    phone: "1234567890",
    register: "2023-10-30",
    date: "계약기간 : 2024-12-12",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "27",
    id: "test",
    name: "농성명",
    user: "농가사용자",
    unit: "3개소",
    num: "9",
    phone: "1234567890",
    register: "2023-10-30",
    date: "계약기간 : 2024-12-12",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
    id: "",
    name: "",
    user: "",
    unit: "",
    num: "",
    phone: "",
    register: "",
    date: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
    id: "",
    name: "",
    user: "",
    unit: "",
    num: "",
    phone: "",
    register: "",
    date: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
    id: "",
    name: "",
    user: "",
    unit: "",
    num: "",
    phone: "",
    register: "",
    date: "",
  },
];
