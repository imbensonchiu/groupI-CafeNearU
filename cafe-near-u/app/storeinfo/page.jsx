/* eslint-disable no-unused-vars */
"use client";
import { IconButton, Switch, Button, Dialog } from "@material-tailwind/react";
import { useState } from "react";

import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Filter from "../components/filter.jsx";
import storesHome from "../components/homepage/stores.js";
import StoreCard from "../components/StoreCard";

export default function h() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Header />
      <div id="categories" className=" mx-[10%] justify-between flex flex-row">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />

        <div className="flex items-end mt-28 gap-8 mb-3 flex-nowrap  ">
          <div className="flex flex-col justify-center items-center relative">
            <IconButton variant="text" className="rounded-full">
              <span className="material-symbols-outlined">home</span>
            </IconButton>
            <span className="self-center text-xs lg:text-sm">我的搜尋</span>
          </div>
          <div className="h-full border-r border-gray-300 border-w-2 mb-1"></div>
          <div className="flex flex-col">
            <IconButton variant="text" className="rounded-full">
              <span className="material-symbols-outlined">work</span>
            </IconButton>
            <span className="self-center  text-xs lg:text-sm">工作</span>
          </div>
          <div className="flex flex-col">
            <IconButton variant="text" className="rounded-full">
              <span className="material-symbols-outlined">local_cafe</span>
            </IconButton>
            <span className="self-center  text-xs lg:text-sm">放鬆</span>
          </div>
          <div className="flex flex-col">
            <IconButton variant="text" className="rounded-full">
              <span class="material-symbols-outlined">groups</span>
            </IconButton>
            <span className="self-center text-xs lg:text-sm">聚會</span>
          </div>
          <div className="flex flex-col">
            <IconButton variant="text" className="rounded-full">
              <span class="material-symbols-outlined">pets</span>
            </IconButton>
            <span className="self-center  text-xs lg:text-sm">寵物</span>
          </div>
          <div className="flex flex-col">
            <IconButton variant="text" className="rounded-full">
              <span class="material-symbols-outlined">schedule</span>
            </IconButton>
            <span className="self-center text-xs lg:text-sm">不限時</span>
          </div>
          <div className="flex flex-col">
            <IconButton variant="text" className="rounded-full">
              <span class="material-symbols-outlined">cookie</span>
            </IconButton>
            <span className="self-center  text-xs lg:text-sm">甜點</span>
          </div>
          <div className="flex flex-col">
            <IconButton variant="text" className="rounded-full">
              <span class="material-symbols-outlined">power</span>
            </IconButton>
            <span className="self-center  text-xs lg:text-sm">插座</span>
          </div>
          <div className="flex flex-col">
            <IconButton variant="text" className="rounded-full">
              <span class="material-symbols-outlined">casino</span>
            </IconButton>
            <span className="self-center text-xs lg:text-sm">好手氣</span>
          </div>
        </div>
        <button
          onClick={handleOpen}
          class="bg-[#D0B8A8] h-12 mt-28 flex items-center justify-center space-x-2 font-bold text-white px-4 rounded-sm"
        >
          <img
            src="sliders.png"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          />
          <span>篩選條件</span>
        </button>
      </div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Filter />
      </Dialog>
      <hr className="border-gray-300" />
      <div className="flex">
        <div className="container w-[55%] ml-[10%] grid grid-cols-9 gap-8 mt-8">
          <span className="col-span-2 col-start-1 self-center text-2xl me-8">
            顯示23間咖啡廳
          </span>

          <div className="w-[75%] col-span-2 col-start-3 relative flex items-center border-black border-2 rounded-full">
            <div className="self-center text-lg ml-4">低消價格</div>

            <Switch
              id="custom-switch-component"
              ripple={false}
              className="ml-1 h-full w-full checked:bg-[#D0B8A8]"
              containerProps={{
                className: "w-11 h-6",
              }}
              circleProps={{
                className: "ml-1 before:hidden left-0.5 border-none",
              }}
            />
          </div>

          <Button className="ml-[30%] w-[50%] col-span-2 col-start-8 bg-[#D0B8A8] px-2 py-2 text-md ">
            下一頁
          </Button>

          <div className="col-span-9 grid grid-cols-9 gap-8 justify-center">
            {storesHome.data.shops.workspace.map((store) => (
              <StoreCard
                className={"rounded-xl col-span-6 lg:col-span-3"}
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
        </div>
        <div class="w-[25%] h-[920px] bg-gray-200 "></div>
      </div>
      <Footer className="fixed bottom-0" />
    </>
  );
}
