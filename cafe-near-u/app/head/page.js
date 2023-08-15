"use client";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Avatar,
} from "@material-tailwind/react";

function HeadPage() {
  return (
    <Menu>
      <MenuHandler>
        <Button color="blue" className="px-4 py-2">
          Open Menu
        </Button>
      </MenuHandler>{" "}
      <Avatar src="/img/face-2.jpg" alt="avatar" size="md" />
      <MenuList>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </MenuList>
    </Menu>
  );
}
export default HeadPage;
