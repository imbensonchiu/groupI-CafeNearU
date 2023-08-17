/* eslint-disable no-unused-vars */
"use client";
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
import { useState } from "react";

import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Wish from "../components/wishitem.jsx";
import Comment from "../components/comment.jsx";

export default function h() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };
  return (
    <>
      <Header />
      <div className=" text-4xl mt-32 mb-4 ml-[10%] text-5c5c5c text-left font-bold font-normal">
        口袋名單收藏
      </div>
      <hr className="border-gray-300 mb-20 " />
      <Wish />

      <Footer className="fixed bottom-0" />
    </>
  );
}
