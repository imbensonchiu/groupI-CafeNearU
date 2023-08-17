/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-else-return */
import "react-time-picker/dist/TimePicker.css";

import {
  Textarea,
  Button,
  Dialog,
  Input,
  DialogHeader,
  DialogBody,
  DialogFooter,
  ButtonGroup,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Select,
  Option,
  Checkbox,
  Typography,
  ListItemPrefix,
} from "@material-tailwind/react";

const TABLE_HEAD = ["品項", "價格", "分類", ""];

const TABLE_ROWS = [
  {
    item: "芋頭",
    price: 100,
    category: "難吃的東西",
  },
  {
    item: "好喝可樂",
    price: 200,
    category: "特色飲品",
  },
  {
    item: "好吃冰淇淋",
    price: 300,
    category: "特色甜點",
  },
];

import { useState } from "react";

import TimePicker from "react-time-picker";
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

const data = [
  {
    label: "一般席",
    value: "normal",
    desc: `It really matters and then like it really doesn't matter.
    What matters is the people who are sparked by it. And the people
    who are like offended by it, it doesn't matter.`,
  },
  {
    label: "插座席",
    value: "socket",
    desc: `123456`,
  },
  {
    label: "戶外席",
    value: "outside",
    desc: `123456`,
  },
];

const dataOp = [
  {
    label: "星期一",
    value: "mon",
    desc: `It really matters and then like it really doesn't matter.
    What matters is the people who are sparked by it. And the people
    who are like offended by it, it doesn't matter.`,
  },
  {
    label: "星期二",
    value: "tue",
    desc: `123456`,
  },
  {
    label: "星期三",
    value: "wed",
    desc: `123456`,
  },
  {
    label: "星期四",
    value: "thu",
    desc: `It really matters and then like it really doesn't matter.
    What matters is the people who are sparked by it. And the people
    who are like offended by it, it doesn't matter.`,
  },
  {
    label: "星期五",
    value: "fri",
    desc: `123456`,
  },
  {
    label: "星期六",
    value: "sat",
    desc: `123456`,
  },
  {
    label: "星期日",
    value: "sun",
    desc: `123456`,
  },
];

export default function DialogEdit({ open, handleOpen, type }) {
  const [disabled, setDisabled] = useState(false);
  const [time, onChange] = useState("10:00");
  if (type === 0) {
    //店況快速更新
    return (
      <Dialog size="md" open={open} handler={handleOpen} className="rounded-md">
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
              <Button className="text-base font-normal">正常營業</Button>
              <Button className="text-base font-normal">時間異動</Button>
              <Button className="text-base font-normal">店休</Button>
            </ButtonGroup>
          </div>
          <div className="flex flex-row gap-6 mt-4">
            <div className="pl-2 col-span-4 text-gray-800 ">剩餘座位</div>
            <Tabs
              value="normal"
              orientation="horizontal"
              className="col-span-8 flex flex-col self-center"
            >
              <TabsHeader className="w-auto">
                {data.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody className="w-80 flex flex-row self-center my-4">
                {data.map(({ value }) => (
                  <TabPanel key={value} value={value} className="py-0">
                    <div className="flex flex-row justify-center">
                      <Button className="bg-[#B79681] text-base text-white rounded-full font-normal p-1">
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
                        <strong>剩 25 席</strong> / 共 30 席
                      </div>
                      <Button className="bg-[#c3ab9b] text-base text-white rounded-full font-normal p-1">
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
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
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
            更新
          </Button>
        </DialogFooter>
      </Dialog>
    );
  } else if (type === 1) {
    // 店況其他設定
    return (
      <Dialog size="md" open={open} handler={handleOpen} className="rounded-md">
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start border-l-[#B79681] border-l-8 rounded-t-md">
            <div className="text-xl text-[#B79681] mb-1 w-fit py-1 transition-all text-left font-medium">
              店況其他設定
            </div>
            <div className="text-base text-gray-700 mr-2 text-left font-normal">
              座位種類、座位數量
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
        <DialogBody divider className="flex flex-col">
          <div className="pl-2  text-gray-800 ">新增座位</div>
          <div className="flex flex-row ml-2 mt-2 mb-2 gap-2 flex-wrap">
            <div className="flex-wrap">
              <Input
                label="座位類別"
                className="py-4"
                containerProps={{ className: "w-full" }}
              />
            </div>
            <div>
              <Input
                label="座位數量"
                className="py-4"
                containerProps={{ className: "w-full" }}
              />
            </div>

            <Button className="py-2 px-1 text-base bg-[#B79681] w-full md:w-3/12">
              新增
            </Button>
          </div>
          <div className="pl-2  text-gray-800 mt-2">清單預覽</div>

          <Card className="w-auto">
            <List>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                <div className="flex flex-row gap-2">
                  <div>一般席</div> <strong> 25 席</strong>
                </div>
                <ListItemSuffix>
                  <IconButton variant="text" color="blue-gray">
                    <TrashIcon />
                  </IconButton>
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                <div className="flex flex-row gap-2">
                  <div>插座席</div> <strong> 20 席</strong>
                </div>
                <ListItemSuffix>
                  <IconButton variant="text" color="blue-gray">
                    <TrashIcon />
                  </IconButton>
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                <div className="flex flex-row gap-2">
                  <div>戶外席</div> <strong> 5 席</strong>
                </div>
                <ListItemSuffix>
                  <IconButton variant="text" color="blue-gray">
                    <TrashIcon />
                  </IconButton>
                </ListItemSuffix>
              </ListItem>
            </List>
          </Card>
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
            更新
          </Button>
        </DialogFooter>
      </Dialog>
    );
  } else if (type === 2) {
    // 設定基本資料
    return (
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
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-6 flex flex-col">
              <div className="ml-0 mt-3 font-normal">基本資訊</div>
              <div className="grid grid-cols-12">
                <div className="col-span-12 mb-4 lg:col-span-6 lg:mr-2 lg:mb-0">
                  <Input
                    label="店家名稱"
                    className="py-4"
                    size="lg"
                    containerProps={{ className: "md:my-2" }}
                  />
                </div>
                <div className="col-span-12 mb-2 lg:col-span-6 lg:mb-0">
                  <Select
                    variant="outlined"
                    size="lg"
                    label="咖啡廳類型"
                    className="col-start-7 col-span-6"
                    containerProps={{ className: "md:my-2" }}
                  >
                    <Option>工作 / 唸書型</Option>
                    <Option>放鬆 / 休閒型</Option>
                    <Option>綜合型</Option>
                    <Option>寵物型</Option>
                    <Option>主題型</Option>
                  </Select>
                </div>
              </div>
              <div className="col-span-12">
                <Input
                  label="店家地址"
                  className="py-4"
                  size="lg"
                  containerProps={{ className: "w-auto my-2" }}
                />
              </div>
              <div className="col-span-12">
                <Input
                  label="聯絡電話"
                  className="py-4"
                  size="lg"
                  containerProps={{ className: "w-auto my-2" }}
                />
              </div>
              <div className="col-span-12">
                <Textarea
                  label="店家簡介"
                  className="py-4"
                  size="lg"
                  containerProps={{ className: "w-auto my-2" }}
                />
              </div>
              <div className="ml-0 mt-4 font-normal">社群媒體</div>
              <div className=" col-span-12 grid grid-cols-12 xl:grid-cols-10 mt-2 mb-2">
                <div className="my-2 xl:my-0 col-span-12 xl:col-span-5 xl:mr-auto xl:mb-4 xl:w-11/12">
                  <Select
                    variant="outlined"
                    size="lg"
                    label="社群類型"
                    containerProps={{
                      className: "",
                    }}
                  >
                    <Option>Facebook</Option>
                    <Option>Instagram</Option>
                    <Option>LINE</Option>
                  </Select>
                </div>
                <div className="my-2 xl:my-0 col-span-12 xl:col-span-5">
                  <Input label="社群帳號 / 網址" size="lg" className="py-4" />
                </div>
                <Button className="my-2 xl:my-0 py-2 px-1 text-base bg-[#7D6E83] col-span-12">
                  新增至社群清單
                </Button>
              </div>
              <Card className="w-auto">
                <List>
                  <ListItem ripple={false} className="py-1 pr-1 pl-4">
                    <div className="flex flex-row gap-2">
                      <strong> LINE </strong> <div>www.line.com/example</div>
                    </div>
                    <ListItemSuffix>
                      <IconButton variant="text" color="blue-gray">
                        <TrashIcon />
                      </IconButton>
                    </ListItemSuffix>
                  </ListItem>
                  <ListItem ripple={false} className="py-1 pr-1 pl-4">
                    <div className="flex flex-row gap-2">
                      <strong> Facebook </strong>{" "}
                      <div>www.facebook.com/example</div>
                    </div>
                    <ListItemSuffix>
                      <IconButton variant="text" color="blue-gray">
                        <TrashIcon />
                      </IconButton>
                    </ListItemSuffix>
                  </ListItem>
                  <ListItem ripple={false} className="py-1 pr-1 pl-4">
                    <div className="flex flex-row gap-2">
                      <strong> Instagram </strong>{" "}
                      <div>www.instagram.com/example</div>
                    </div>
                    <ListItemSuffix>
                      <IconButton variant="text" color="blue-gray">
                        <TrashIcon />
                      </IconButton>
                    </ListItemSuffix>
                  </ListItem>
                </List>
              </Card>
              <div className="ml-0 mt-8 font-normal">營業時間</div>
              <Tabs
                value="mon"
                orientation="horizontal"
                className="col-span-8 flex flex-col self-center mt-4"
              >
                <TabsHeader className="w-auto">
                  {dataOp.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
                <TabsBody className="w-80 flex flex-row self-center my-4">
                  {dataOp.map(({ value }) => (
                    <TabPanel key={value} value={value} className="py-0">
                      <div className="flex flex-row justify-around">
                        <div className="self-center px-3 text-2xl flex flex-col gap-2 justify-between">
                          <TimePicker
                            onChange={onChange}
                            value={time}
                            className="flex flex-row text-base ring-0"
                            disableClock
                            disabled={disabled}
                          />
                          <div className="mx-2 text-base text-center"> 至 </div>
                          <TimePicker
                            onChange={onChange}
                            value={time}
                            className="flex flex-row text-base ring-0"
                            disableClock
                            disabled={disabled}
                          />
                        </div>
                        <div className="self-center">
                          <Checkbox
                            label="休息日"
                            onClick={() => {
                              setDisabled(!disabled);
                            }}
                          />
                        </div>
                      </div>
                    </TabPanel>
                  ))}
                </TabsBody>
              </Tabs>
              <div className="ml-0 mt-8 font-normal">最低消費</div>
              <div className="col-span-12 grid grid-cols-12 gap-2">
                <Input
                  label="最低消費金額（預估值）"
                  className="py-4"
                  size="lg"
                  containerProps={{
                    className: "col-span-12 lg:col-span-6 my-2",
                  }}
                />
                <Input
                  label="最低消費金額（補充資訊）"
                  className="py-4"
                  size="lg"
                  containerProps={{
                    className: "col-span-12 lg:col-span-6 my-2",
                  }}
                />
              </div>
              <div className="ml-0 mt-8 font-normal">時間限制</div>
              <div className="col-span-12 grid grid-cols-12 gap-2">
                <Input
                  label="時間限制（以小時計算）"
                  className="py-4"
                  size="lg"
                  containerProps={{
                    className: "col-span-12 lg:col-span-6 my-2",
                  }}
                />
                <Input
                  label="時間限制（補充資訊）"
                  className="py-4"
                  size="lg"
                  containerProps={{
                    className: "col-span-12 lg:col-span-6 my-2",
                  }}
                />
              </div>

              <div className="ml-0 mt-8 font-normal">自訂規則</div>

              <div className="col-span-12 grid grid-cols-12">
                <Input
                  label="自訂規則（標題）"
                  className="py-4"
                  size="lg"
                  containerProps={{
                    className: "col-span-12 my-2",
                  }}
                />
                <Textarea
                  label="自訂規則（補充資訊）"
                  className="py-4"
                  size="lg"
                  containerProps={{
                    className: "col-span-12 my-2",
                  }}
                />
                <Button className="my-2 xl:my-0 py-2 px-1 text-base bg-[#7D6E83] col-span-12">
                  新增至自訂規則清單
                </Button>
                <Card className="col-span-12">
                  <List>
                    <ListItem ripple={false} className="py-1 pr-1 pl-4">
                      <div className="flex flex-row gap-2">
                        <strong> 這是規定 </strong>
                        <div>這是規定的說明文字</div>
                      </div>
                      <ListItemSuffix>
                        <IconButton variant="text" color="blue-gray">
                          <TrashIcon />
                        </IconButton>
                      </ListItemSuffix>
                    </ListItem>
                    <ListItem ripple={false} className="py-1 pr-1 pl-4">
                      <div className="flex flex-row gap-2">
                        <strong> 這是規定 </strong>
                        <div>這是規定的說明文字</div>
                      </div>
                      <ListItemSuffix>
                        <IconButton variant="text" color="blue-gray">
                          <TrashIcon />
                        </IconButton>
                      </ListItemSuffix>
                    </ListItem>
                    <ListItem ripple={false} className="py-1 pr-1 pl-4">
                      <div className="flex flex-row gap-2">
                        <strong> 這是規定 </strong>
                        <div>這是規定的說明文字</div>
                      </div>
                      <ListItemSuffix>
                        <IconButton variant="text" color="blue-gray">
                          <TrashIcon />
                        </IconButton>
                      </ListItemSuffix>
                    </ListItem>
                  </List>
                </Card>
              </div>
              <div className="ml-0 mt-8 font-normal">設備與服務</div>
              <List className="flex-row">
                <ListItem className="p-0">
                  <label
                    htmlFor="horizontal-list-socket"
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id="horizontal-list-socket"
                        ripple={false}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: "p-0",
                        }}
                      />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="text-sm xl:text-base font-medium"
                    >
                      插座
                    </Typography>
                  </label>
                </ListItem>
                <ListItem className="p-0">
                  <label
                    htmlFor="horizontal-list-wifi"
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id="horizontal-list-wifi"
                        ripple={false}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: "p-0",
                        }}
                      />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="text-sm xl:text-base font-medium"
                    >
                      WiFi
                    </Typography>
                  </label>
                </ListItem>
                <ListItem className="p-0">
                  <label
                    htmlFor="horizontal-list-cat"
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id="horizontal-list-cat"
                        ripple={false}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: "p-0",
                        }}
                      />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="text-sm xl:text-base font-medium"
                    >
                      店貓
                    </Typography>
                  </label>
                </ListItem>
                <ListItem className="p-0">
                  <label
                    htmlFor="horizontal-list-dog"
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id="horizontal-list-dog"
                        ripple={false}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: "p-0",
                        }}
                      />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="text-sm xl:text-base font-medium"
                    >
                      店狗
                    </Typography>
                  </label>
                </ListItem>
                <ListItem className="p-0">
                  <label
                    htmlFor="horizontal-list-smoke"
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id="horizontal-list-smoke"
                        ripple={false}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: "p-0",
                        }}
                      />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="text-sm xl:text-base font-medium"
                    >
                      吸煙區
                    </Typography>
                  </label>
                </ListItem>
              </List>
              <div className="col-span-12 grid grid-cols-12">
                <Input
                  label="自訂設備與服務（標題）"
                  className="py-4"
                  size="lg"
                  containerProps={{
                    className: "col-span-12 my-2",
                  }}
                />
                <Textarea
                  label="自訂設備與服務（補充資訊）"
                  className="py-4"
                  size="lg"
                  containerProps={{
                    className: "col-span-12 my-2",
                  }}
                />
                <Button className="my-2 xl:my-0 py-2 px-1 text-base bg-[#7D6E83] col-span-12">
                  新增至自訂設備與服務清單
                </Button>
                <Card className="col-span-12">
                  <List>
                    <ListItem ripple={false} className="py-1 pr-1 pl-4">
                      <div className="flex flex-row gap-2">
                        <strong> 這是設備與服務 </strong>
                        <div>這是設備與服務的說明文字</div>
                      </div>
                      <ListItemSuffix>
                        <IconButton variant="text" color="blue-gray">
                          <TrashIcon />
                        </IconButton>
                      </ListItemSuffix>
                    </ListItem>
                    <ListItem ripple={false} className="py-1 pr-1 pl-4">
                      <div className="flex flex-row gap-2">
                        <strong> 這是設備與服務 </strong>
                        <div>這是設備與服務的說明文字</div>
                      </div>
                      <ListItemSuffix>
                        <IconButton variant="text" color="blue-gray">
                          <TrashIcon />
                        </IconButton>
                      </ListItemSuffix>
                    </ListItem>
                    <ListItem ripple={false} className="py-1 pr-1 pl-4">
                      <div className="flex flex-row gap-2">
                        <strong> 這是設備與服務 </strong>
                        <div>這是設備與服務的說明文字</div>
                      </div>
                      <ListItemSuffix>
                        <IconButton variant="text" color="blue-gray">
                          <TrashIcon />
                        </IconButton>
                      </ListItemSuffix>
                    </ListItem>
                  </List>
                </Card>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 m-4 mt-2/4">
              <div className=" w-auto h-80 rounded-md bg-blue-gray-50 text-4xl text-center flex flex-row justify-center">
                <span className="self-center">地圖預覽</span>
              </div>
              <Button
                variant="outlined"
                fullWidth
                className="text-base font-normal mt-6 lg:mt-14"
              >
                上傳店家圖片
              </Button>
              <div className=" w-auto h-96 rounded-md bg-blue-gray-50 text-4xl text-center flex flex-row justify-center mt-4">
                <span className="self-center">圖片預覽</span>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-4 lg:container lg:mx-auto">
          <Button
            variant="outlined"
            onClick={handleOpen}
            className="text-base px-6 border border-[#7D6E83] text-[#7D6E83] "
          >
            關閉
          </Button>
          <Button
            onClick={handleOpen}
            className="text-base px-6 bg-[#7D6E83] text-white"
          >
            更新
          </Button>
        </DialogFooter>
      </Dialog>
    );
  } else if (type === 3) {
    // 設定菜單資料
    return (
      <Dialog
        size="xxl"
        open={open}
        handler={handleOpen}
        className="lg:container lg:mx-auto overflow-scroll z-[100]"
      >
        <div className="flex items-center justify-between sticky top-0 bg-white z-50">
          <DialogHeader className="flex flex-col items-start border-l-[#7D6E83] border-l-8 lg:container lg:mx-auto ">
            <div className="text-xl text-[#7D6E83] mb-1 w-fit py-1 transition-all text-left font-medium">
              設定菜單資料
            </div>
            <div className="text-base text-gray-700 mr-2 text-left font-normal">
              將店家菜單匯入至 <span className="font-logo">CaféNearU</span>
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
          <div className="ml-0 mt-3 font-normal text-lg mb-4">
            你可以選擇 <strong>匯入 Excel 檔</strong>{" "}
            <Button
              variant="outlined"
              className="ml-6 text-base px-6 border border-[#7D6E83] text-[#7D6E83] "
            >
              上傳 Excel 檔
            </Button>
          </div>
          <Card className="h-full w-full overflow-scroll">
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
                {TABLE_ROWS.map(({ item, price, category }, index) => {
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          <div className="ml-0 mt-12 font-normal text-lg mb-4">
            或者 <strong>手動輸入菜單資訊</strong>{" "}
          </div>
          <div className="grid grid-cols-12 gap-2">
            <Input
              label="品項"
              className="py-4"
              containerProps={{ className: "col-span-12 xl:col-span-3" }}
            />
            <Input
              label="價格"
              className="py-4"
              containerProps={{ className: "col-span-12 xl:col-span-3" }}
            />
            <Input
              label="分類"
              className="py-4"
              containerProps={{ className: "col-span-12 xl:col-span-3" }}
            />
            <Button
              onClick={handleOpen}
              className="text-base px-6 xl:py-0  bg-[#7D6E83] text-white  col-span-12 py-2  xl:col-span-2"
            >
              新增項目至菜單
            </Button>
          </div>
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
                {TABLE_ROWS.map(({ item, price, category }, index) => {
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </DialogBody>

        <DialogFooter className="space-x-4 lg:container lg:mx-auto">
          <Button
            variant="outlined"
            onClick={handleOpen}
            className="text-base px-6 border border-[#7D6E83] text-[#7D6E83] "
          >
            關閉
          </Button>
          <Button
            onClick={handleOpen}
            className="text-base px-6 bg-[#7D6E83] text-white"
          >
            更新
          </Button>
        </DialogFooter>
      </Dialog>
    );
  } else if (type === 4) {
    // 發布設定
    return (
      <Dialog
        size="xxl"
        open={open}
        handler={handleOpen}
        className="rounded-md"
      >
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start border-l-[#7D6E83] border-l-8 ">
            <div className="text-xl text-[#7D6E83] mb-1 w-fit py-1 transition-all text-left font-medium">
              發布設定
            </div>
            <div className="text-base text-gray-700 mr-2 text-left font-normal">
              預覽畫面，並將店家資訊公開至
              <span className="font-logo">CaféNearU</span>
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
        <DialogBody divider className="flex flex-col"></DialogBody>
        <DialogFooter className="space-x-4 ">
          <Button
            variant="outlined"
            onClick={handleOpen}
            className="text-base px-6 border border-[#7D6E83] text-[#7D6E83] "
          >
            關閉
          </Button>
          <Button
            onClick={handleOpen}
            className="text-base px-6 bg-[#7D6E83] text-white"
          >
            更新
          </Button>
        </DialogFooter>
      </Dialog>
    );
  } else if (type === 5) {
    // 帳戶設定
    return (
      <Dialog
        size="xxl"
        open={open}
        handler={handleOpen}
        className="rounded-md"
      >
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start border-l-[#7D6E83] border-l-8 ">
            <div className="text-xl text-[#7D6E83] mb-1 w-fit py-1 transition-all text-left font-medium">
              帳戶設定
            </div>
            <div className="text-base text-gray-700 mr-2 text-left font-normal">
              修改電子郵箱地址、修改密碼
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
        <DialogBody divider className="flex flex-col"></DialogBody>
        <DialogFooter className="space-x-4 ">
          <Button
            variant="outlined"
            onClick={handleOpen}
            className="text-base px-6 border border-[#7D6E83] text-[#7D6E83] "
          >
            關閉
          </Button>
          <Button
            onClick={handleOpen}
            className="text-base px-6 bg-[#7D6E83] text-white"
          >
            更新
          </Button>
        </DialogFooter>
      </Dialog>
    );
  }

  return <></>;
}
