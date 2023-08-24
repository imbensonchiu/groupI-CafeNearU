"use client";

import useSWR from "swr";
import Cookies from "js-cookie";

export default function useStoreBasicInfo() {
  const id = Cookies.get("storeid");
  const fetcher = (url) =>
    fetch(url).then((res) => {
      if (!res.ok) {
        const error = new Error("An error occurred while fetching the data.");
        // Attach extra info to the error object.
        error.info = res.json();
        error.status = res.status;
        throw error;
      }
      return res.json();
    });
  const { data, error, isLoading, mutate } = useSWR(
    `https://13.211.10.154/api/1.0/shops/${id}/basic-info`,
    fetcher
  );
  return { basicInfo: data, isLoading, isError: error, mutate };
}
