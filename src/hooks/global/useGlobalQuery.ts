import http from "@/http";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const useGlobalQuery = <T, K, D = K>(
  {
    URL,
    key,
  }: {
    URL: string;
    key: string | string[];
  },
  params?: T,
  options?: Omit<
    UseQueryOptions<AxiosResponse<K>, AxiosError, D>,
    "queryKey" | "queryFn"
  >,
  segment?: string,
) => {
  const { data, isError, isSuccess, error } = useQuery<
    AxiosResponse<K>,
    AxiosError,
    D
  >({
    queryKey: params ? [key, params] : [key],
    queryFn: () =>
      http.get(!segment ? URL : `${URL}/${segment}`, params && { params }),
    select: (data) => data.data,
    ...options,
  } as UseQueryOptions<AxiosResponse<K>, AxiosError, D>);
  return { data, isError, isSuccess, error };
  //
};

export default useGlobalQuery;
