import React from "react";
import Button from "@mui/material/Button";
import {
  AiOutlineCompass,
  AiOutlineHome,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { LiaFacebookMessenger } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../slice/auth.slice";
import "./index.css";

const footer = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const handleHomeIconClick = () => {
    Navigate("/feed");
  };

  const handlePlusIconClick = () => {
    Navigate("/add");
  };

  const handleUserIconClick = () => {
    Navigate("/profile");
  };
  const handleLogOut = () => {
    dispatch(logout());
    Navigate("/signin");
  };
  return (
    <>
      <div className="bottom-div  w-full bg-white shadow-md  sm:hidden ">
        <div className="text-2xl flex justify-around items-center cursor-pointer">
          <AiOutlineHome onClick={handleHomeIconClick} />

          <AiOutlinePlusCircle onClick={handlePlusIconClick} />

          <FaUserAlt onClick={handleUserIconClick} />
          <Button variant="contained" onClick={handleLogOut}>
            Log out
          </Button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default footer;
