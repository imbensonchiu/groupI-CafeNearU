/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  ButtonGroup,
} from "@material-tailwind/react";

export default function Login() {
  const [activeButton, setActiveButton] = useState("guest");

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <Card className=" mx-auto">
      <div className="px-4 py-3 text-center font-bold text-xl text-[#030712]">
        登入
      </div>
      <hr className="border-gray-300" />

      <div className="container mx-auto flex items-center justify-start py-4">
        <p className="text-[#030712] text-xl ml-4 me-2 text-left font-logo">
          CafeNearU
        </p>
        <p className="text-[#030712] text-xl text-left font-inter me-4">
          歡迎你回來
        </p>
        <ButtonGroup variant="outlined" size="sm" className="flex items-center">
          <Button
            className={`${
              activeButton === "guest" ? "bg-black text-white" : ""
            } hover:bg-black hover:text-white`}
            onClick={() => handleButtonClick("guest")}
          >
            客人
          </Button>
          <Button
            className={`${
              activeButton === "store" ? "bg-black text-white" : ""
            } hover:bg-black hover:text-white`}
            onClick={() => handleButtonClick("store")}
          >
            店家
          </Button>
        </ButtonGroup>
      </div>

      <CardBody className="flex flex-col gap-4">
        <Input label="帳號" size="lg" />
        <Input label="密碼" size="lg" />
      </CardBody>

      <CardFooter className="pt-0 mt-8">
        <div className="flex justify-center items-center">
          <Button className="bg-[#D0B8A8] px-6 py-2 text-lg">登入</Button>
        </div>

        <Typography variant="small" className="mt-6 flex justify-center">
          忘記密碼?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            點我
          </Typography>
        </Typography>
      </CardFooter>
      <div className="flex items-center justify-center">
        <hr className="mt-4 border-gray-300 flex-grow" />
        <div className="flex items-center">
          <p className="text-[#030712] text-sm mt-2 mx-4">或</p>
        </div>
        <hr className="mt-4 border-gray-300 flex-grow" />
      </div>
      <div className="flex items-center justify-center mt-4 mb-4">
        <Button
          size="md"
          variant="outlined"
          color="#030712"
          className="flex items-center gap-3 w-80 mb-4 items-center text-left"
        >
          <img src="images.png" alt="metamask" className="h-6 w-6" />
          <span className="flex-grow text-center">使用 Google 登入</span>
        </Button>
      </div>
    </Card>
  );
}
