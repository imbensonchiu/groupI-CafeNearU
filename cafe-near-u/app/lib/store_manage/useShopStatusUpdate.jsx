"use client";

import useSWR from "swr";

export default function useShopStatusUpdate({ token, request }) {
    const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    const body = JSON.stringify({ ...request });

    const fetcher = (url) =>
        fetch(url, { headers: header, body, method: "PUT" }).then((res) =>
            res.json()
        );

    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_HOST}/shops/status`,
        fetcher
    );

    return { owner: data, isLoading, isError: error };
}
