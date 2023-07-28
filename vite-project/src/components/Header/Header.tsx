import React from "react";
import Logo from "../../images/Instagram.png";
import { BsHeart } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineCompass } from "react-icons/ai";
import { LiaFacebookMessenger } from "react-icons/lia";
import { FaUserAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import { Outlet, useNavigate } from "react-router-dom";

const header = () => {
  const Navigate = useNavigate();
  const handleHomeIconClick = () => {
    Navigate("/home");
  };
  const handleMessengerIconClick = () => {
    Navigate("/messenger");
  };
  const handlePlusIconClick = () => {
    Navigate("/add");
  };
  const handleCompassIconClick = () => {
    Navigate("/discover");
  };
  const handleHeartIconClick = () => {
    Navigate("/likes");
  };
  const handleUserIconClick = () => {
    Navigate("/profile");
  };
  return (
    <>
      <div className="top-div h-[10vh] w-full bg-white shadow-md flex items-center justify-around pl-6 fixed top-0 left-0 z-50 ">
        <img
          src={Logo}
          alt="instagram logo"
          className="w-32 object-cover ml-8 "
        />
        <div>
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none h-10 bg-[rgb(228,224,224)] hover:bg-transparent focus:bg-transparent border py-1 px-2 mr-5 rounded-md"
          />
        </div>
        <div className="text-2xl flex space-x-4 items-centers cursor-pointer">
          <AiOutlineHome onClick={handleHomeIconClick} />
          <LiaFacebookMessenger onClick={handleMessengerIconClick} />
          <AiOutlinePlusCircle onClick={handlePlusIconClick} />
          <AiOutlineCompass onClick={handleCompassIconClick} />
          <BsHeart onClick={handleHeartIconClick} />
          <FaUserAlt onClick={handleUserIconClick} />
          <Button variant="contained">Log out</Button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default header;
