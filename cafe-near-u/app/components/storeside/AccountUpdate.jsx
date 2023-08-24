import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
} from "@material-tailwind/react";
import useOwnerProfile from "../../lib/store_manage/useOwnerProfile";
import Cookies from "js-cookie";
import { useState } from "react";
import ownerProfileUpdate from "../../lib/store_manage/ownerProfileUpdate";
import ownerPasswordUpdate from "../../lib/store_manage/ownerPasswordUpdate";

export default function AccountUpdate({ open, handleOpen }) {
    const { owner } = useOwnerProfile(Cookies.get("token"));
    console.log(owner);

    const [username, setUsername] = useState(owner?.data?.user?.name);
    const [email, setEmail] = useState(owner?.data?.user?.email);
    const [password, setPassword] = useState("");
    const [usernameEdit, setUsernameEdit] = useState(false);
    const [emailEdit, setEmailEdit] = useState(false);
    const [passwordEdit, setPasswordEdit] = useState(false);

    async function handleUpdate(token) {
        const data = {
            username,
            email,
        };
        await ownerProfileUpdate(token, data);

        if (passwordEdit) {
            const passwordData = {
                new_password: password,
            };
            await ownerPasswordUpdate(token, passwordData);
        }
    }

    return (
        <Dialog
            size="md"
            open={open}
            handler={handleOpen}
            className="lg:container lg:mx-auto overflow-scroll z-[100]"
        >
            <div className="flex items-center justify-between sticky top-0 bg-white z-50">
                <DialogHeader className="flex flex-col items-start border-l-[#7D6E83] border-l-8 lg:container lg:mx-auto ">
                    <div className="text-xl text-[#7D6E83] mb-1 w-fit py-1 transition-all text-left font-medium">
                        帳戶設定
                    </div>
                    <div className="text-base text-gray-700 mr-2 text-left font-normal">
                        使用者名稱、電子郵箱地址、密碼
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
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 flex flex-col">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <Input
                                    label="使用者名稱"
                                    className="py-4 "
                                    size="lg"
                                    value={username}
                                    containerProps={{
                                        className: "my-2 col-span-12",
                                    }}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    disabled={!usernameEdit}
                                />
                                <Button
                                    size="sm"
                                    className="!absolute right-6 top-[30px] rounded"
                                    variant="text"
                                    onClick={() =>
                                        setUsernameEdit(!usernameEdit)
                                    }
                                >
                                    {!usernameEdit ? "編輯" : "取消"}
                                </Button>
                            </div>

                            <div className="col-span-12">
                                <Input
                                    label="電子郵箱地址"
                                    value={email}
                                    type="email"
                                    className="py-4 "
                                    size="lg"
                                    onChange={(e) => setEmail(e.target.value)}
                                    containerProps={{
                                        className: "my-2 col-span-12",
                                    }}
                                    disabled={!emailEdit}
                                />
                                <Button
                                    size="sm"
                                    className="!absolute right-6 top-[90px] rounded"
                                    variant="text"
                                    onClick={() => setEmailEdit(!emailEdit)}
                                >
                                    {!emailEdit ? "編輯" : "取消"}
                                </Button>
                            </div>

                            <div className="col-span-12">
                                <Input
                                    label="密碼"
                                    type="password"
                                    value={password}
                                    className="py-4 "
                                    size="lg"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    containerProps={{
                                        className: "my-2 col-span-12",
                                    }}
                                    disabled={!passwordEdit}
                                />
                                <Button
                                    size="sm"
                                    className="!absolute right-6 top-[150px] rounded"
                                    variant="text"
                                    onClick={() =>
                                        setPasswordEdit(!passwordEdit)
                                    }
                                >
                                    {!passwordEdit ? "編輯" : "取消"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogBody>
            <DialogFooter className="space-x-4 lg:container lg:mx-auto">
                <Button
                    variant="outlined"
                    onClick={() => {
                        handleUpdate(Cookies.get("token"));
                        handleOpen();
                    }}
                    className="text-base px-6 border border-[#7D6E83] text-[#7D6E83] "
                >
                    關閉
                </Button>
                <Button
                    onClick={handleOpen}
                    className="text-base px-6 bg-[#7D6E83] text-white"
                    onClick={() => {
                        handleUpdate(Cookies.get("token"));
                        handleOpen();
                    }}
                >
                    更新
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
