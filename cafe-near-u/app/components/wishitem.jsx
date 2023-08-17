/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function Wish() {
  return (
    <>
      <div className="ml-[10%] w-[15%] h-72">
        <Card className="w-[100%] h-[100%] transform hover:scale-110 transition-transform  border border-[#00000] shadow-ld">
          <CardHeader floated={false} className="shadow-md h-80">
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
      </div>
    </>
  );
}
