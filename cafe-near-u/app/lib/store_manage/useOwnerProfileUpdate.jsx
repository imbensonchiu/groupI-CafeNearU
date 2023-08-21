"use client";

import useSWR from "swr";
export default function useOwnerProfileUpdate({ token, profile }) {
    const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    const body = JSON.stringify({ ...profile });

    const fetcher = (url) =>
        fetch(url, { headers: header, body, method: "PATCH" }).then((res) =>
            res.json()
        );

    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_HOST}/shop-owners/profile`,
        fetcher
    );

    return { owner: data, isLoading, isError: error };
}
