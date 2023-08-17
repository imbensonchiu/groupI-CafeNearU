import { useState } from "react";

export default function Footer() {
  return (
    <div className="mt-40 absolute bottom-0 left-0 w-full bg-white-200 text-center">
      <div className="container mx-auto flex items-center justify-center">
        <p className="text-gray-600 text-3xl mb-2 me-4 font-logo">CafeNearU</p>
        <p className="text-gray-600">
          Copyright © 2023 CaféNearU. All rights reserved.
        </p>
      </div>
      <div
        className=""
        style={{
          width: "100%",
          height: "15px",
          flexShrink: 0,
          background: "#D0B8A8",
        }}
      />
    </div>
  );
}
