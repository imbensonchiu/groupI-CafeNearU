"use client";

import { Carousel } from "@material-tailwind/react";

export default function StoreCard({ className, store }) {
    const { name, primary_image, operating_status, min_order, seats } = store;

    let seat = seats.some((elem) => elem.available_seats);

    return (
        <div className={`flex flex-col justify-center  ${className}`}>
            <Carousel transition={{ duration: 2 }}>
                <img
                    src={primary_image}
                    className="h-72 w-72 object-cover rounded-xl"
                />
            </Carousel>
            <div className="text-2xl my-2 mt-4 text-gray-800">{name}</div>
            <div className="text-base text-gray-600 mb-4">{`${operating_status}  |  最低消費 $${min_order} | ${
                seat ? "尚有座位" : "座位已滿"
            }`}</div>
        </div>
    );
}
