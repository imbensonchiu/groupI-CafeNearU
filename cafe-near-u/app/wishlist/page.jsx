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
  Tooltip,
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
      <div className="text-4xl mt-8 mb-4 ml-[10%] text-5c5c5c text-left font-bold font-normal">
        口袋名單收藏
      </div>
      <hr className="border-gray-300 mb-20 " />
      <div className="ml-[10%] w-[20%]">
        <Card className="w-[100%] transform hover:scale-110 transition-transform">
          <CardHeader floated={false} className="h-80">
            <img
              src="duck.jpg"
              alt="profile-picture"
              className="h-[100%] w-[100%]"
            />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Natalie Paisley
            </Typography>
          </CardBody>
          <CardFooter className="flex justify-center gap-7 pt-2"></CardFooter>
        </Card>
      </div>

      <Footer className="fixed bottom-0" />
    </>
  );
}
