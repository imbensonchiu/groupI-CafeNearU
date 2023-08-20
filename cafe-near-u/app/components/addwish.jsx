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

export default function Addwish() {
  return (
    <>
      <Card className=" w-full mx-auto">
        <div className="px-4 py-3 text-center font-bold text-xl text-[#030712]">
          收藏口袋名單
        </div>
        <hr className="border-gray-300 mb-8" />
        <div className="flex flex-wrap justify-center ">
          <Card className="w-[45%] h-48 md:h-60 mb-8 transform hover:scale-110 transition-transform  border border-[#00000] ">
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
          </Card>
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
          </Card> */}
        </div>
        <hr className="border-gray-300 mb-4" />
        <div className="flex justify-center items-center">
          <Button className="w-[80%] bg-[#D0B8A8] px-6 py-2 text-lg mb-4">
            建立新的心願單
          </Button>
        </div>
      </Card>
    </>
  );
}
