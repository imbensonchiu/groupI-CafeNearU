/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";

import Login from "../components/login.jsx";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  ButtonGroup,
  Slider,
} from "@material-tailwind/react";

export default function Filter() {
  const [username, setUsername] = useState("");
  const [activeButton, setActiveButton] = useState("guest");

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };
  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  return (
    <>
      <Card className="w-[700px] mx-auto">
        <div className="px-4 py-3 text-center font-bold text-xl text-[#030712]">
          篩選條件
        </div>
        <hr className="border-gray-300" />
        <div className="flex items-center">
          <div className="container mx-auto flex-row items-center justify-start py-4">
            <p className="text-[#030712] text-xl ml-8 me-2 mb-4 text-left font-bold">
              咖啡廳類型
            </p>
            <ButtonGroup
              variant="outlined"
              size="lg"
              className="flex ml-8 items-center"
            >
              <Button
                className={`${activeButton === "all" ? "bg-[#D0B8A8]" : ""}`}
                onClick={() => handleButtonClick("all")}
              >
                所有
              </Button>
              <Button
                className={`${activeButton === "work" ? "bg-[#D0B8A8]" : ""}`}
                onClick={() => handleButtonClick("work")}
              >
                工作
              </Button>
              <Button
                className={`${activeButton === "free" ? "bg-[#D0B8A8]" : ""}`}
                onClick={() => handleButtonClick("free")}
              >
                休閒
              </Button>
              <Button
                className={`${activeButton === "gather" ? "bg-[#D0B8A8]" : ""}`}
                onClick={() => handleButtonClick("gather")}
              >
                寵物
              </Button>
            </ButtonGroup>
            <p className="text-[#030712] text-md mt-1 ml-12 mb-2 text-left">
              工作的定義是什麼呢
            </p>{" "}
          </div>

          <img
            src="cafe.gif"
            alt="cafe"
            className="w-60 h-28 text-gray-600 me-16"
          />
        </div>

        <hr className="border-gray-300 w-11/12 mx-auto" />

        <div className="container mx-auto flex-row items-center justify-start ml-8 py-4">
          <p className="text-[#030712] text-xl me-2 mb-2 text-left font-bold">
            設備與服務
          </p>
          <div className="flex gap-4">
            <Checkbox label="有插座" />
            <Checkbox label="WIFI" />
            <Checkbox label="店狗" />
            <Checkbox label="店貓" />
            <Checkbox label="吸菸區" />
          </div>
        </div>
        <hr className="border-gray-300 w-11/12 mx-auto" />

        <div className="container mx-auto flex-row items-center justify-start ml-8 py-4">
          <div className="flex items-center mb-2">
            <p className="text-[#030712] text-xl me-2 text-left font-bold">
              低消範圍
            </p>

            <div className="relative w-36">
              <div className="absolute left-0 top-0 h-full flex items-center justify-center w-12">
                <img
                  src="dollar-sign.svg"
                  alt="Dollar Sign"
                  className="w-4 h-4 text-gray-600"
                />
              </div>
              <input
                type="search"
                className="w-full h-11 px-4 pl-12 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-[40px] shadow-lg"
                placeholder="最低價格"
              />
            </div>
          </div>
          {/* <div className="flex w-96 flex-col gap-8">
            <Slider size="sm" defaultValue={50} />
            <Slider size="md" defaultValue={50} />
            <div>
              <Slider
                size="md"
                defaultValue={sliderValue}
                onChange={handleSliderChange}
              />
              <p>Slider Value: {sliderValue}</p>
            </div>
          </div> */}
        </div>
        <hr className="border-gray-300 w-11/12 mx-auto" />
        <div className="container mx-auto flex-col items-center justify-start ml-8 py-4">
          <div className="flex items-center mb-2">
            <p className="text-[#030712] text-xl me-2 mb-2 text-left font-bold">
              消費時間
            </p>
          </div>

          <ButtonGroup
            variant="outlined"
            size="lg"
            className="flex items-center"
          >
            <Button
              className={`${activeButton === "alltime" ? "bg-[#D0B8A8]" : ""}`}
              onClick={() => handleButtonClick("alltime")}
            >
              所有
            </Button>
            <Button
              className={`${activeButton === "limit" ? "bg-[#D0B8A8]" : ""}`}
              onClick={() => handleButtonClick("limit")}
            >
              有限時
            </Button>
            <Button
              className={`${activeButton === "unlimit" ? "bg-[#D0B8A8]" : ""}`}
              onClick={() => handleButtonClick("unlimit")}
            >
              不限時
            </Button>
          </ButtonGroup>
        </div>
        <hr className="border-gray-300 w-full mx-auto" />

        <div className="flex justify-center items-center flex-row justify-between mt-4 mb-2">
          <p className="ml-8 text-[#030712] text-md text-left font-bold border-b border-black">
            清除全部
          </p>
          <Button className="bg-[#D0B8A8] px-6 py-2 text-lg mr-8 mb-4">
            顯示23間咖啡廳
          </Button>
        </div>
      </Card>
    </>
  );
}
