"use client";

import "react-time-picker/dist/TimePicker.css";
import HeaderStore from "../../../components/storeside/HeaderStore";
import InfoUpdateForm from "../../../components/storeside/InfoUpdateForm";
import Cookies from "js-cookie";
const handleLogout = () => {
  Cookies.remove("token");
  Cookies.remove("ownerId");
  // Cookies.remove("postid");
  if (typeof window !== "undefined") {
    window.location.href = "/"; // 登出後重定向至登入頁面
  }
};
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <HeaderStore handleLogout={handleLogout} />
      <div className="flex items-center justify-between top-0 bg-white z-50">
        <div className="mt-2 flex flex-col items-start border-l-[#7D6E83] border-l-8 lg:container lg:mx-auto ">
          <div className="pl-2 text-xl text-[#7D6E83] mb-1 w-fit py-1 transition-all text-left font-medium">
            您好，歡迎使用 <span className="font-logo">CaféNearU</span>！
          </div>
          <div className="pl-2 text-base text-gray-700 mr-2 text-left font-normal">
            由於您初次使用本系統，請於此設定您的基本資料
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:container lg:mx-auto mt-2">
        <InfoUpdateForm />
      </div>
    </>
  );
}
