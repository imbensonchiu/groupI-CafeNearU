"use client";

import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    ButtonGroup,
    Chip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useStatus from "../../lib/store_manage/useStatus";
import Cookies from "js-cookie";
import shopStatusUpdate from "../../lib/store_manage/shopStatusUpdate";

const statusList = ["正常營業", "提早關門", "店休"];

export default function StatusUpdate({ open, handleOpen }) {
    const { status, isError } = useStatus(Cookies.get("ownerId"));
    const operating_status = status?.data?.operating_status;
    let statusCode = 1;
    if (operating_status === "提早關門") statusCode = 2;
    else if (operating_status === "店休") statusCode = 3;

    const [value, setValue] = useState(statusCode);

    const seats = status?.data?.shop?.seats;
    const [seat, setSeat] = useState(new Array(seats?.length));

    return (
        <Dialog
            size="md"
            open={open}
            handler={handleOpen}
            className="rounded-md"
        >
            <div className="flex items-center justify-between">
                <DialogHeader className="flex flex-col items-start border-l-[#B79681] border-l-8 rounded-t-md">
                    <div className="text-xl text-[#B79681] mb-1 w-fit py-1 transition-all text-left font-medium">
                        店況快速更新
                    </div>
                    <div className="text-base text-gray-700 mr-2 text-left font-normal">
                        營業狀況、座位剩餘
                    </div>
                </DialogHeader>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-3 h-5 w-5 cursor-pointer"
                    onClick={handleOpen}
                >
                    <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <DialogBody divider>
                <div className="flex flex-row gap-6">
                    <div className="pl-2 col-span-4 self-center text-gray-800 ">
                        營業資訊
                    </div>
                    <ButtonGroup variant="outlined" className="col-span-8">
                        <Button
                            className={`text-base font-normal ${
                                value === 1 && "bg-gray-800 text-white"
                            }`}
                            onClick={() => setValue(1)}
                        >
                            正常營業
                        </Button>
                        <Button
                            className={`text-base font-normal ${
                                value === 2 && "bg-gray-800 text-white"
                            }`}
                            onClick={() => setValue(2)}
                        >
                            時間異動
                        </Button>
                        <Button
                            className={`text-base font-normal ${
                                value === 3 && "bg-gray-800 text-white"
                            }`}
                            onClick={() => setValue(3)}
                        >
                            店休
                        </Button>
                    </ButtonGroup>
                </div>
                <div className="flex flex-col gap-6 mt-4">
                    <div className="pl-2 col-span-4 text-gray-800 ">
                        剩餘座位
                    </div>
                    {seats?.map(
                        ({ type, available_seats, total_seats }, index) => {
                            const newSeat = seat.map((item, i) => {
                                if (i === index) return available_seats;
                                return item;
                            });
                            setSeat(newSeat);

                            return (
                                <div
                                    className="flex flex-row justify-center"
                                    key={index}
                                >
                                    <Chip
                                        className="self-center px-3 text-xl mr-4 font-light"
                                        color="white"
                                        value={type}
                                        variant="outlined"
                                    />
                                    <Button
                                        className="bg-[#B79681] text-base text-white rounded-full font-normal p-1"
                                        onClick={() => {
                                            const newSeatPlus = seat.map(
                                                (item, i) => {
                                                    if (
                                                        i === index &&
                                                        item < total_seats
                                                    )
                                                        return item + 1;
                                                    return item;
                                                }
                                            );
                                            setSeat(newSeatPlus);
                                            const req = {
                                                operating_status:
                                                    statusList[value - 1],
                                                type,
                                                available_seats:
                                                    newSeatPlus[index],
                                            };
                                            shopStatusUpdate(
                                                Cookies.get("token"),
                                                req
                                            );
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 4.5v15m7.5-7.5h-15"
                                            />
                                        </svg>
                                    </Button>
                                    <div className="self-center px-3 text-2xl">
                                        <strong>{`剩 ${seat[index]} 席`}</strong>{" "}
                                        {`/ 共 ${total_seats} 席`}
                                    </div>
                                    <Button
                                        className="bg-[#c3ab9b] text-base text-white rounded-full font-normal p-1"
                                        onClick={() => {
                                            const newSeatPlus = seat.map(
                                                (item, i) => {
                                                    if (i === index && item > 0)
                                                        return item - 1;
                                                    return item;
                                                }
                                            );
                                            setSeat(newSeatPlus);
                                            const req = {
                                                operating_status:
                                                    statusList[value - 1],
                                                type,
                                                available_seats:
                                                    newSeatPlus[index],
                                            };
                                            shopStatusUpdate(
                                                Cookies.get("token"),
                                                req
                                            );
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 12h-15"
                                            />
                                        </svg>
                                    </Button>
                                </div>
                            );
                        }
                    )}
                </div>
            </DialogBody>
            <DialogFooter className="space-x-4 ">
                <Button
                    variant="outlined"
                    onClick={handleOpen}
                    className="text-base px-6 border border-[#B79681] text-[#B79681] "
                >
                    關閉
                </Button>
                <Button
                    onClick={handleOpen}
                    className="text-base px-6 bg-[#B79681] text-white"
                >
                    完成
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
