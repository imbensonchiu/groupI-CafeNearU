"use client";

import useSWR from "swr";

export default function useMenuUpdate({ token, menu }) {
    const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    const body = JSON.stringify(menu);

    const fetcher = (url) =>
        fetch(url, { headers: header, body, method: "PUT" }).then((res) =>
            res.json()
        );

    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_HOST}/shop-owners/menu`,
        fetcher
    );

    return { owner: data, isLoading, isError: error };
}
