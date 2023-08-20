"use client";

import { useState } from "react";
import Login from "./login.jsx";
import Signup from "./signup.jsx";
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

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(true);
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const [opensignup, setopensignup] = useState(false);
    const handleOpensignup = () => setopensignup((cur) => !cur);

    return (
        <>
            <div className="w-full h-[86px] flex-shrink-0 bg-white text-gray-600 text-center font-train-one font-normal flex justify-between items-center px-200  border-d shadow-md z-[100]">
                <div className="font-logo text-4xl ml-[10%] text-5c5c5c text-center font-train-one font-normal">
                    CafeNearU
                </div>
                <div className="relative flex items-center">
                    <div className="absolute left-0 top-0 h-full flex items-center justify-center w-12">
                        <img
                            src="../search.svg"
                            alt="Avatar"
                            className="w-6 h-6 text-gray-600"
                        />
                    </div>
                    <input
                        type="search"
                        className="w-[100%] h-11 px-4 pl-12 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg shadow-md"
                        placeholder="開始搜尋"
                    />
                </div>
                <div className="me-[10%] flex items-center">
                    <div className="relative">
                        <img
                            src="../account_circle.svg"
                            alt="main"
                            className="w-12 h-12 rounded-full cursor-pointer"
                            onMouseOver={toggleMenu}
                        />
                        {isMenuOpen && (
                            <div
                                className="absolute right-0 top-[50px] w-60 bg-white border border-gray-300 rounded-2xl shadow-lg"
                                onMouseLeave={closeMenu}
                            >
                                <ul className="">
                                    <li
                                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-left font-bold text-xl"
                                        onClick={handleOpen}
                                    >
                                        登入
                                    </li>
                                    <hr className="border-gray-300" />
                                    <li
                                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-left font-bold text-xl"
                                        onClick={handleOpensignup}
                                    >
                                        註冊
                                    </li>

                                    <hr className="border-gray-300 " />
                                </ul>
                                {/* <ul className="">
                  <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-left font-bold text-xl">
                    心願單
                  </li>
                  <hr className="border-gray-300" />
                  <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-left font-bold text-xl">
                    個人資料
                  </li>
                  <hr className="border-gray-300 " />
                  <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-left  text-xl">
                    登出
                  </li>
                  <hr className="border-gray-300 " />
                </ul> */}
                                <div className="text-gray-400 text-sm px-4 py-3 font-inter text-center text-lg font-logo">
                                    CafeNearU
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Login />
            </Dialog>
            <Dialog
                size="xs"
                open={opensignup}
                handler={handleOpensignup}
                className="bg-transparent shadow-none"
            >
                <Signup />
            </Dialog>
        </>
    );
}
