// useAxios hook

import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestHeaders } from "axios";

const BASE_URL: string = process.env.REACT_APP_API_URL || "";

type UrlType = { [x: string]: string };
type MultipleResponse<T> = {
  [Property in keyof T]: Record<string, any>;
};
type useAxiosParams = {
  url: UrlType[] | string;
  method: "get" | "post";
  body?: Record<string, any>;
  headers?: AxiosRequestHeaders;
};

export const useAxios = ({ url, method, body, headers }: useAxiosParams) => {
  const [response, setResponse] = useState<
    MultipleResponse<UrlType> | Record<string, any> | null
  >(null);
  const [error, setError] = useState<Record<string, any> | string>("");
  const [loading, setloading] = useState<boolean>(true);

  const fetchData = useCallback(() => {
    if (Array.isArray(url)) {
      Promise.all(
        url.map((u, i) => {
          console.log(Object.values(u), i);
          return axios[method](
            `${BASE_URL}${Object.values(u)[0]}`,
            headers ?? undefined,
            body ?? undefined
          );
        })
      )
        .then((result) => {
          const a = result.reduce((t, c, i) => {
            console.log(Object.keys(url[i])[0]);
            const key = Object.keys(url[i])[0];
            return { ...t, [key]: c.data };
          }, {});
          console.log(a);
          setResponse(a as MultipleResponse<UrlType>);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setloading(false);
        });
    } else {
      axios[method](
        `${BASE_URL}${url}`,
        headers ?? undefined,
        body ?? undefined
      )
        .then((res) => {
          setResponse(res.data as Record<string, any>);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setloading(false);
        });
    }
  }, [url, method, body, headers]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    response,
    error,
    loading,
  };
};
