/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";

import Login from "../components/login.jsx";
import Header from "../components/header.jsx";
import Signup from "../components/signup.jsx";
import Footer from "../components/footer.jsx";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";

import {
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function h() {
  const [inputDisabled, setInputDisabled] = useState(true);

  const enableInput = () => {
    setInputDisabled(false);
  };
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState("自我介紹文字");
  const [interest, setInterest] = useState("興趣文字");
  const [password, setPassword] = useState("密碼");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInfoChange = (e) => {
    setInfo(e.target.value);
  };

  const handleInterestChange = (e) => {
    setInterest(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const defaultImageSrc = "account_circle.svg"; // 替換為預設圖片的 URL

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      await uploadProfilePicture(file); // Upload the profile picture
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Header />
      <div className="text-4xl mt-32 mb-4 ml-[10%] text-5c5c5c text-left font-bold font-normal">
        個人資料
      </div>

      <hr className="border-gray-300 mb-20 " />
      <div className="text-2xl mt-8 mb-4 ml-[10%] text-5c5c5c text-left font-bold ">
        編輯大頭貼
      </div>

      <div class="w-64 h-64 ml-[10%] rounded-full bg-white flex">
        <img
          src={defaultImageSrc}
          alt="User"
          width={180}
          height={180}
          className="w-64 h-64"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{ cursor: "pointer", objectFit: "cover" }}
        />
      </div>

      <div className="ml-[10%] w-[30%]">
        <div className="flex w-[100%] flex-col gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="text-xl font-bold">名稱</div>
              </div>
            </div>
            <div className="mb-4">
              {isEditing ? (
                <input
                  className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none"
                  type="text"
                  value={info}
                  onChange={handleInfoChange}
                />
              ) : (
                <div className="border-b border-gray-300">{info}</div>
              )}
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="text-xl font-bold">學校(可匿名)</div>
              </div>
            </div>
            <div>
              {isEditing ? (
                <input
                  className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none"
                  type="text"
                  value={interest}
                  onChange={handleInterestChange}
                />
              ) : (
                <div className="border-b border-gray-300">{interest}</div>
              )}
            </div>
            <Button
              onClick={handleEditClick}
              variant="gradient"
              className="mt-4"
            >
              {isEditing ? "儲存個人資料" : "編輯個人資料"}
            </Button>

            <div className="flex items-center justify-between mt-4 mb-4">
              <div className="flex items-center">
                <div className="text-xl font-bold">密碼</div>
              </div>
            </div>
            <div>
              <div className="border-b border-gray-300">{password}</div>
            </div>
            <Button onClick={handleOpen} variant="gradient" className="mt-4">
              修改密碼
            </Button>
            <Dialog size="xs" open={open} handler={handleOpen}>
              <Card className=" mx-auto">
                <div className="px-4 py-3 text-center font-bold text-xl text-[#030712]">
                  修改密碼
                </div>
                <hr className="border-gray-300" />

                <div className="container mx-auto flex items-center justify-start py-4">
                  <p className="text-[#030712] text-xl ml-4 me-2 text-left font-logo">
                    CafeNearU
                  </p>
                  <p className="text-[#030712] text-xl text-left font-inter me-4">
                    提醒您要記得寫下來呦~
                  </p>
                </div>

                <CardBody className="flex flex-col gap-4">
                  <Input label="新密碼" size="lg" />
                  <Input label="確認密碼" size="lg" />
                </CardBody>

                <CardFooter className="pt-0 mt-8">
                  <div className="flex justify-center items-center">
                    <Button className="bg-[#D0B8A8] px-6 py-2 text-lg">
                      送出密碼
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Dialog>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
