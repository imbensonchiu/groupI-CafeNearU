import {
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Button,
} from "@material-tailwind/react";
import "react-time-picker/dist/TimePicker.css";
import InfoUpdateForm from "./InfoUpdateForm";
import { ToastContainer, toast } from "react-toastify";

export default function InfoUpdate({ open, handleOpen, edit = true }) {
    return (
        <>
            <Dialog
                size="xxl"
                open={open}
                handler={handleOpen}
                className="lg:container lg:mx-auto overflow-scroll z-[100]"
            >
                <div className="flex items-center justify-between sticky top-0 bg-white z-50">
                    <DialogHeader className="flex flex-col items-start border-l-[#7D6E83] border-l-8 lg:container lg:mx-auto ">
                        <div className="text-xl text-[#7D6E83] mb-1 w-fit py-1 transition-all text-left font-medium">
                            設定基本資料
                        </div>
                        <div className="text-base text-gray-700 mr-2 text-left font-normal">
                            名稱、簡介、地點、聯絡資訊、營業資訊、設備與服務
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
                <DialogBody className="flex flex-col lg:container lg:mx-auto">
                    <InfoUpdateForm edit={edit} handleOpen={handleOpen} />
                </DialogBody>
            </Dialog>
            <ToastContainer
                position="top-right"
                autoClose={4999}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}
