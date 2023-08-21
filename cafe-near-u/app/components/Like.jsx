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
  Dialog,
} from "@material-tailwind/react";
import Addtowishlist from "./Addtowishlist.jsx";
import { useState, useEffect } from "react";

import useFetchWishlist from "../ApiHook/useFetchWishlist.jsx";

export default function Addwish() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const { userWishlist, fetchWishlist } = useFetchWishlist();
  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center max-h-[80vh] overflow-y-auto">
        <Card className=" w-full mx-auto">
          <div className="px-4 py-3 text-center font-bold text-xl text-[#030712]">
            收藏口袋名單
          </div>
          <hr className="border-gray-300 mb-4" />
          <div className="flex flex-wrap justify-center ">
            {userWishlist.map((data) => (
              <div key={data.id} className={"md:w-[45%] w-[100%]  p-2"}>
                <>
                  <Card className="w-[100%] h-48 md:h-60 mb-2 transform hover:scale-110 transition-transform  border border-[#00000] ">
                    <CardHeader floated={false} className="h-80">
                      <img
                        src={data.cover}
                        alt={data.name}
                        className="h-[100%] w-[100%]"
                      />
                    </CardHeader>
                    <CardBody className="text-center p-2">
                      <Typography
                        variant="h4"
                        color="blue-gray"
                        className="text-sm"
                      >
                        {data.name}
                      </Typography>
                    </CardBody>
                  </Card>
                </>
              </div>
            ))}
            {/* <Card className="w-[45%] h-48 md:h-60 mb-8 transform hover:scale-110 transition-transform  border border-[#00000] ">
              <CardHeader floated={false} className="h-80">
                <img
                  src="duck.jpg"
                  alt="profile-picture"
                  className="h-[100%] w-[100%]"
                />
              </CardHeader>
              <CardBody className="text-center p-2">
                <Typography variant="h4" color="blue-gray" className="text-xl">
                  佩佩的口袋名單
                </Typography>
              </CardBody>
            </Card>
            <Card className="ml-[5%] w-[45%] h-48 md:h-60 mb-8 transform hover:scale-110 transition-transform">
              <CardHeader floated={false} className="h-80">
                <img
                  src="duck.jpg"
                  alt="profile-picture"
                  className="h-[100%] w-[100%]"
                />
              </CardHeader>
              <CardBody className="text-center p-2">
                <Typography variant="h4" color="blue-gray" className="text-xl">
                  佩佩的口袋名單
                </Typography>
              </CardBody>
            </Card> */}
          </div>
          <hr className="border-gray-300 mb-4" />
          <div className="flex justify-center items-center">
            <Button
              onClick={handleOpen}
              className="w-[80%] border border-color-[#D0B8A8] bg-[#D0B8A8] px-6 py-2 text-lg mb-4"
            >
              建立新的心願單
            </Button>
          </div>
        </Card>
        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Addtowishlist handleOpen={handleOpen} />
        </Dialog>
      </div>
    </>
  );
}
