"use client";

import { useState } from "react";
import HeaderStore from "../components/storeside/HeaderStore";
import DialogEdit from "../components/storeside/DialogEdit";
import Swal from "sweetalert2";

import useStoreBasicInfo from "../lib/store_manage/useStoreBasicInfo";
import useStatus from "../lib/store_manage/useStatus";
import useOwnerStatus from "../lib/store_manage/useOwnerStatus";
import useOwnerProfile from "../lib/store_manage/useOwnerProfile";

import Cookies from "js-cookie";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);

  if (Cookies.get("ownerId") === undefined) {
    Swal.fire({
      title: "您沒有權限訪問此頁面",
      text: "請先登入店家端帳號後再進行操作",
      icon: "warning",
      confirmButtonText: "回到首頁",
    });
    if (typeof window !== "undefined") {
      window.location.replace("/");
    }
  }

  console.log(Cookies.get());

  const { newOwner } = useOwnerStatus(Cookies.get("token"));
  console.log(newOwner);

  if (newOwner?.new_owner) {
    Swal.fire({
      title: "您是初次使用的新用戶",
      text: "請先設定您的基本資料",
      icon: "warning",
      confirmButtonText: "繼續",
    });
    if (typeof window !== "undefined") {
      window.location.replace("/store/init/basic_info");
    }
  }

  const { owner } = useOwnerProfile(Cookies.get("token"));
  console.log("owner", owner);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("ownerId");
    // Cookies.remove("postid");
    }
    if (typeof window !== "undefined") {
        window.location.href = "/"; // 登出後重定向至登入頁面
      }
    
  };

  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  if (owner) {
    return (
      <>
        <HeaderStore handleLogout={handleLogout} />

        <DialogEdit open={open} handleOpen={handleOpen} type={type} />
        <div className="h-80 lg:container lg:mx-auto flex flex-col justify-end border-b">
          <span className="text-4xl mb-8 mx-2 font-light flex flex-col md:flex-row">
            <div className="font-medium ml-2 mb-2 md:mb-0 md:ml-0">你好！</div>
            <div className="ml-2 md:ml-0">{owner.data?.user.name}</div>
          </span>
        </div>
        <div className="flex flex-col">
          <div className="lg:container lg:mx-auto ">
            <div className="grid grid-cols-12 justify-items-start mb-4 border-b">
              <div className="ml-4 md:ml-2 my-4 pl-2 border-l-4 border-l-[#B79681] col-span-6 flex flex-col ">
                <div
                  className="text-xl text-[#B79681] mb-1 cursor-pointer hover:text-white hover:bg-[#B79681] w-fit py-1 transition-all text-left hover:px-2"
                  onClick={() => {
                    setType(0);
                    handleOpen();
                  }}
                >
                  店況快速更新
                </div>
                <div className="text-base text-gray-700 mr-2">
                  營業狀況、座位剩餘
                </div>
              </div>
              <div className="my-4 pl-2 border-l-4 border-l-[#B79681]  col-span-6 ">
                <div
                  className="text-xl text-[#B79681] mb-1 cursor-pointer hover:text-white hover:bg-[#B79681] w-fit py-1 transition-all text-left hover:px-2"
                  onClick={() => {
                    setType(1);
                    handleOpen();
                  }}
                >
                  店況其他設定
                </div>
                <div className="text-base text-gray-700 mr-2">
                  座位種類、座位數量
                </div>
              </div>
            </div>
          </div>
          <div className="lg:container lg:mx-auto">
            <div className="grid grid-cols-12 justify-items-start">
              <div className="ml-4 md:ml-2 my-4 pl-2 border-l-4 border-l-[#7D6E83] col-span-6 md:col-span-3 flex flex-col">
                <div
                  className="text-xl text-[#7D6E83]  mb-1 cursor-pointer hover:text-white hover:bg-[#7D6E83] w-fit py-1 transition-all text-left hover:px-2"
                  onClick={() => {
                    setType(2);
                    handleOpen();
                  }}
                >
                  設定基本資料
                </div>
                <div className="text-base text-gray-700 mr-2">
                  名稱、簡介、地點、聯絡資訊、營業資訊、設備與服務
                </div>
              </div>
              <div className="my-4 pl-2 border-l-4 border-l-[#7D6E83]  col-span-6 md:col-span-3">
                <div
                  className="text-xl text-[#7D6E83]  mb-1 cursor-pointer hover:text-white hover:bg-[#7D6E83] w-fit py-1 transition-all text-left hover:px-2"
                  onClick={() => {
                    setType(3);
                    handleOpen();
                  }}
                >
                  設定菜單資料
                </div>
                <div className="text-base text-gray-700 mr-2">
                  將店家菜單匯入至 <span className="font-logo">CaféNearU</span>
                </div>
              </div>
              <div className="ml-4 md:ml-0 my-4 pl-2 border-l-4 border-l-[#7D6E83]  col-span-6 md:col-span-3">
                <div
                  className="text-xl text-[#7D6E83]  mb-1 cursor-pointer hover:text-white hover:bg-[#7D6E83] w-fit py-1 transition-all text-left hover:px-2"
                  onClick={() => {
                    setType(4);
                    handleOpen();
                  }}
                >
                  發布設定
                </div>
                <div className="text-base text-gray-700 mr-2">
                  將店家資訊公開至
                  <span className="font-logo">CaféNearU</span>
                </div>
              </div>
              <div className="my-4 pl-2 border-l-4 border-l-[#7D6E83]  col-span-6 md:col-span-3">
                <div
                  className="text-xl text-[#7D6E83]  mb-1 cursor-pointer hover:text-white hover:bg-[#7D6E83] w-fit py-1 transition-all text-left hover:px-2"
                  onClick={() => {
                    setType(5);
                    handleOpen();
                  }}
                >
                  帳戶設定
                </div>
                <div className="text-base text-gray-700 mr-2">
                  使用者名稱、電子郵箱地址、密碼
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center self-center">
      <img src="../cat.gif" className="self-center"></img>
    </div>
  );
}
