/* eslint-disable no-unused-vars */
"use client";

import {
    Tooltip,
    IconButton,
    Switch,
    Button,
    Dialog,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";

import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import Filter from "../../components/filter.jsx";
import storesHome from "../../components/homepage/stores.js";
import StoreCard from "../../components/StoreCard.jsx";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";

import useSearchResult from "../../lib/useSearchResult";

export default function H({ params }) {
    const Map = ({ addresses, names }) => {
        const { isLoaded } = useLoadScript({
            googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            libraries: ["places"],
        });
        let posList = [];

        if (isLoaded) {
            posList = addresses.map((address) =>
                getGeocode({ address }).then((res) => {
                    const { lat, lng } = getLatLng(res[0]);
                    return { lat, lng };
                })
            );
        }
        return posList.length ? (
            <GoogleMap
                zoom={10}
                center={{ lat: 25.033, lng: 121.565 }}
                mapContainerClassName="m-6 w-full h-full rounded-md"
            >
                {posList.map((p, index) =>
                    p.then((res) => (
                        <>
                            <Marker
                                position={res}
                                label={{
                                    text: names[index],
                                    color: "white",
                                    className:
                                        "p-2 bg-[#7D6E83] -mt-14 font-medium opacity-85 rounded-md",
                                }}
                                symbol={{ fillColor: "#7D6E83" }}
                            />
                        </>
                    ))
                )}
            </GoogleMap>
        ) : (
            <></>
        );
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const token = Cookies.get("token");
    // 獲取網址中的keyword 儲存到cookie

    let url = params.info.replace("%3D", "=").replace("type=", "");

    const [condition, setcondition] = useState("");

    if (condition) {
        url += `&${condition}`;
    }

    const { searchResults, isLoading, isError, mutate } = useSearchResult(
        url,
        token
    );

    return (
        <>
            <Header />
            <div
                id="categories"
                className="mx-[10%] justify-between flex flex-row"
            >
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
                />

                <div className="flex w-full items-end mt-24 gap-8 mb-3 flex-nowrap h-[100px]  ">
                    <div className="flex mb-4 w-[60px] flex-col justify-center items-center relative">
                        <IconButton variant="text" className="rounded-full">
                            <span className="material-symbols-outlined">
                                home
                            </span>
                        </IconButton>
                        <span className="self-center text-xs lg:text-sm">
                            我的搜尋
                        </span>
                    </div>

                    <div className="h-full border-r border-gray-300 border-w-2 mb-1"></div>
                    <div className="flex w-[70%] mb-4 items-center gap-8 flex-nowrap overflow-scroll ">
                        <div className="flex flex-col">
                            <IconButton
                                variant="text"
                                className="rounded-full"
                                onClick={() => {
                                    setcondition("type=工作");
                                }}
                            >
                                <span className="material-symbols-outlined">
                                    work
                                </span>
                            </IconButton>
                            <span className="self-center  text-xs lg:text-sm">
                                工作
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <IconButton
                                variant="text"
                                className="rounded-full"
                                onClick={() => {
                                    setcondition("type=休閒");
                                }}
                            >
                                <span className="material-symbols-outlined">
                                    local_cafe
                                </span>
                            </IconButton>
                            <span className="self-center  text-xs lg:text-sm">
                                休閒
                            </span>
                        </div>
                        {/* <div className="flex flex-col">
              <IconButton variant="text" className="rounded-full">
                <span className="material-symbols-outlined">groups</span>
              </IconButton>
              <span className="self-center text-xs lg:text-sm">聚會</span>
            </div> */}
                        <div className="flex flex-col">
                            <IconButton
                                variant="text"
                                className="rounded-full"
                                onClick={() => {
                                    setcondition("type=寵物");
                                }}
                            >
                                <span class="material-symbols-outlined">
                                    pet_supplies
                                </span>
                            </IconButton>
                            <span className="self-center  text-xs lg:text-sm">
                                寵物
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <IconButton
                                variant="text"
                                className="rounded-full"
                                onClick={() => {
                                    setcondition("no_time_limit=true");
                                }}
                            >
                                <span className="material-symbols-outlined">
                                    schedule
                                </span>
                            </IconButton>
                            <span className="self-center text-xs lg:text-sm">
                                不限時
                            </span>
                        </div>
                        {/* <div className="flex flex-col">
              <IconButton variant="text" className="rounded-full">
                <span className="material-symbols-outlined">cookie</span>
              </IconButton>
              <span className="self-center  text-xs lg:text-sm">甜點</span>
            </div> */}
                        <div className="flex flex-col">
                            <IconButton
                                variant="text"
                                className="rounded-full"
                                onClick={() => {
                                    setcondition("plug=true");
                                }}
                            >
                                <span className="material-symbols-outlined">
                                    power
                                </span>
                            </IconButton>
                            <span className="self-center  text-xs lg:text-sm">
                                插座
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <IconButton variant="text" className="rounded-full">
                                <span className="material-symbols-outlined">
                                    casino
                                </span>
                            </IconButton>
                            <span className="self-center text-xs lg:text-sm">
                                好手氣
                            </span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleOpen}
                    className="bg-[#D0B8A8] w-[15%] h-12 mt-28 hidden md:flex items-center justify-center space-x-2 font-bold text-white px-4 rounded-sm"
                >
                    <img
                        src="../sliders.png"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    />
                    <span>篩選條件</span>
                </button>
            </div>
            <Dialog
                size="sm"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none "
            >
                <Filter handle={handleOpen} setcondition={setcondition} />
            </Dialog>

            <hr className="border-gray-300 w-full" />
            <div className="flex w-full ">
                <div className="container w-[90%] mx-auto md:mx-[0%] md:w-[50%] md:ml-[10%] justify-between grid grid-cols-9 gap-8 mt-8">
                    {isLoading && (
                        <div className="flex flex-col col-span-9 items-center w-full  mx-auto justify-center h-36">
                            <img
                                src="../cat.gif"
                                alt="cafe"
                                className="block mb-4  w-[50%] h-auto text-gray-600 mt-40"
                            />
                            <div className="container mx-auto flex-col md:flex-row flex items-center justify-center">
                                <p className="text-gray-600 text-2xl mb-2 me-4 font-logo">
                                    CafeNearU
                                </p>
                                <p className="text-gray-700 text-xl">
                                    正在努力...
                                </p>
                            </div>
                        </div>
                    )}
                    {!isLoading && !searchResults?.length && (
                        <div className="flex flex-col col-span-9 items-center w-full  mx-auto justify-center h-36">
                            <img
                                src="../cat.gif"
                                alt="cafe"
                                className="block mb-4  w-[50%] h-auto text-gray-600 mt-40"
                            />
                            <div className="container mx-auto flex-col  flex items-center justify-center">
                                {/* <p className="text-gray-600 text-2xl mb-2 me-4 font-logo">
                  CafeNearU
                </p> */}
                                <p className="text-gray-700 text-xl">
                                    雖然查無此咖啡廳
                                </p>
                                <p className="text-gray-700 text-xl">
                                    但還是要給你可愛的貓貓
                                </p>
                            </div>
                        </div>
                    )}

                    {!isLoading && (
                        <div className="col-span-9 grid grid-cols-9 gap-4">
                            {searchResults?.map((store) => (
                                <StoreCard
                                    className={
                                        "rounded-xl col-span-9 md:col-span-3 "
                                    }
                                    key={store.id}
                                    store={store}
                                />
                            ))}
                            {/* {storesHome.data.shops.leisure.map((store) => (
              <StoreCard
                className={"rounded-xl  col-span-6 lg:col-span-3"}
                  key={store.id}
                  store={store}
                />
              ))} */}
                        </div>
                    )}
                </div>
                <div className="hidden md:block w-[30%] h-[920px] ">
                    {searchResults && searchResults.length > 0 && (
                        <Map
                            addresses={searchResults.map(
                                (store) => store.address
                            )}
                            names={searchResults.map((store) => store.name)}
                        />
                    )}
                </div>
            </div>
            <Footer className="fixed bottom-0" />
        </>
    );
}
