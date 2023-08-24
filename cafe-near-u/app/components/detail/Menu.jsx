"use client";
import { Card, Collapse, Button } from "@material-tailwind/react";
import { useState } from "react";

export default function Menu({ menu }) {
    const [openCol, setOpenCol] = useState(false);
    const toggleOpen = () => setOpenCol((cur) => !cur);
    return (
        <>
            {" "}
            <div className="self-start m-4 mb-2 ml-0 text-xl font-light border-0 border-l-4 border-l-[#D0B8A8] pl-2 text-gray-800 flex flex-row gap-4 items-center">
                <div>最新菜單 &nbsp; </div>
            </div>
            <div className="flex flex-col ml-2">
                {menu?.items.map((item, index) => (
                    <div key={index}>
                        <div className="my-4 text-gray-800">
                            {menu.categories[index]}
                        </div>
                        <div className="grid grid-cols-12 gap-4 mr-6 ">
                            {item.map((subitem, subindex) => (
                                <Card
                                    key={subindex}
                                    className="col-span-3 py-2  rounded-md flex justify-center items-center "
                                >
                                    <strong>{subitem.name}&nbsp;</strong> NT$
                                    {subitem.price}
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
