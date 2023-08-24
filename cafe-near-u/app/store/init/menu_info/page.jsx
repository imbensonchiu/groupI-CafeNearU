"use client";

import "react-time-picker/dist/TimePicker.css";
import HeaderStore from "../../../components/storeside/HeaderStore";
import InfoUpdateForm from "../../../components/storeside/InfoUpdateForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import {
  Button,
  Card,
  Typography,
  Input,
  IconButton,
} from "@material-tailwind/react";
import * as XLSX from "xlsx/xlsx.mjs";
import menuUpdate from "../../../lib/store_manage/menuUpdate";
import Cookies from "js-cookie";

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const TABLE_HEAD = ["品項", "價格", "分類", "刪除項目"];

const TABLE_ROWS = [
  {
    item: "芋頭（範例）",
    price: 100,
    category: "難吃的東西（範例）",
  },
];

async function handleChange(e) {
  const f = e.target.files[0];
  console.log(f);
  const data = await f.arrayBuffer();
  /* data is an ArrayBuffer */
  const workbook = XLSX.read(data);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const json = XLSX.utils.sheet_to_json(worksheet);
  const arr = await JSON.parse(JSON.stringify(json));
  console.log(arr);

  return arr;
}

async function handleSubmit(tableRows) {
  const token = Cookies.get("token");
  const menu = { menu: tableRows };
  console.log(menu);
  const res = await menuUpdate({ token, menu });
  console.log(res);
  if (res === 200) {
    if (typeof window !== "undefined") {
      window.location.replace("/store/init/seat_info");
    }
  } else {
    toast.error(`更新失敗 (Error: ${res})`, {
      position: "top-right",
      autoClose: 4999,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

const handleLogout = () => {
  Cookies.remove("token");
  Cookies.remove("ownerId");
  // Cookies.remove("postid");
  if (typeof window !== "undefined") {
    window.location.href = "/"; // 登出後重定向至登入頁面
  }
};

export default function Home() {
  const [tableRows, setTableRows] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("");
  return (
    <>
      <HeaderStore handleLogout={handleLogout} />
      <div className="flex flex-col items-center justify-between top-0 bg-white z-50">
        <div className="mt-2 flex flex-col items-start border-l-[#7D6E83] border-l-8 lg:container lg:mx-auto ">
          <div className="pl-2 text-xl text-[#7D6E83] mb-1 w-fit py-1 transition-all text-left font-medium">
            店家菜單設定
          </div>
          <div className="pl-2 text-base text-gray-700 mr-2 text-left font-normal">
            由於您初次使用本系統，請於此設定您的菜單資訊
          </div>
        </div>
        <div className="flex flex-col lg:container lg:mx-auto my-8">
          <div className="ml-0 mt-3 font-normal text-lg mb-4">
            你可以選擇 <strong>匯入 Excel 檔或 .csv 檔</strong>{" "}
            <label
              for="sheet_uploads"
              variant="outlined"
              className="ml-6 text-base px-6 border border-[#7D6E83] text-[#7D6E83] py-2 rounded-md cursor-pointer hover:bg-[#7D6E83] hover:text-white transition-all"
            >
              上傳 Excel 檔或 .csv 檔
            </label>
            <input
              id="sheet_uploads"
              name="sheet_uploads"
              type="file"
              accept=".xlsx, .xls, .csv"
              className="hidden"
              onChange={async (e) => {
                setTableRows(await handleChange(e));
              }}
            />
          </div>
          <div className="ml-0 mt-6 font-normal text-lg mb-4">
            或者 <strong>手動輸入菜單資訊</strong>{" "}
          </div>
          <div className="grid grid-cols-12 gap-2">
            <Input
              label="品項"
              className="py-4"
              containerProps={{
                className: "col-span-12 xl:col-span-3",
              }}
              onChange={(e) => {
                setNewItem(e.target.value);
              }}
              value={newItem}
            />
            <Input
              label="價格"
              className="py-4"
              containerProps={{
                className: "col-span-12 xl:col-span-3",
              }}
              onChange={(e) => {
                setNewPrice(e.target.value);
              }}
              value={newPrice}
            />
            <Input
              label="分類"
              className="py-4"
              containerProps={{
                className: "col-span-12 xl:col-span-3",
              }}
              onChange={(e) => {
                setNewCategory(e.target.value);
              }}
              value={newCategory}
            />
            <Button
              className="text-base px-6 xl:py-0  bg-[#7D6E83] text-white  col-span-12 py-2  xl:col-span-2"
              onClick={() => {
                setTableRows([
                  ...tableRows,
                  {
                    item: newItem,
                    price: newPrice,
                    category: newCategory,
                  },
                ]);
                setNewItem("");
                setNewPrice("");
                setNewCategory("");
              }}
            >
              新增項目至菜單
            </Button>
          </div>
          {tableRows && (
            <Card className="h-full w-full overflow-scroll mt-8">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map(({ item, price, category }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={item}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item}
                          </Typography>
                        </td>
                        <td className={`${classes} bg-blue-gray-50/50`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {price}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {category}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={() => {
                              setTableRows(
                                tableRows.filter((item, i) => i !== index)
                              );
                            }}
                          >
                            <TrashIcon />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          )}
        </div>
        <div className="space-x-4 lg:container lg:mx-auto flex flex-row justify-end">
          <Button
            className="text-base px-6 bg-[#7D6E83] text-white"
            onClick={() => handleSubmit(tableRows)}
          >
            更新並繼續
          </Button>
        </div>
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
      </div>
    </>
  );
}
