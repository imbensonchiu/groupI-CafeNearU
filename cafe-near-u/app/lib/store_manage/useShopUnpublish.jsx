"use client";

import useSWR from "swr";

export default function useShopUnpublish({ token, isPublish }) {
    const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    const body = JSON.stringify(isPublish);

    const fetcher = (url) =>
        fetch(url, { headers: header, body, method: "POST" }).then((res) =>
            res.json()
        );

    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_HOST}/shop-owners/unpublish`,
        fetcher
    );

    return { owner: data, isLoading, isError: error };
}
