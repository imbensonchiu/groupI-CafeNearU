"use client";

import useSWR from "swr";

export default function useShopSeatTypeUpdate({ token, seats }) {
    const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    const body = JSON.stringify({ ...seats });

    const fetcher = (url) =>
        fetch(url, { headers: header, body, method: "POST" }).then((res) =>
            res.json()
        );

    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_HOST}/shop-owners/seat-setting`,
        fetcher
    );

    return { owner: data, isLoading, isError: error };
}
