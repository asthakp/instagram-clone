import React, { useEffect, useState } from "react";
import Logo from "../../images/Instagram.png";
import { BsHeart } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineCompass } from "react-icons/ai";
import { LiaFacebookMessenger } from "react-icons/lia";
import { FaUserAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import { Outlet, useNavigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slice/auth.slice";
import { postDataWithJWT } from "../../service/axios.service";
import { jwtToken } from "../../utils/helper.utils";
import SearchUser from "../../pages/SearchUser";

const header = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [user, setUser] = useState({});
  const token = jwtToken();
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

  const handleInputChange = async () => {
    if (query) {
      const response = await postDataWithJWT(
        "users/searchuser",
        { query },
        token
      );
      if (response.status) {
        Navigate("/search");
        setUser(response.data);
      }
    } else {
      Navigate("/feed");
    }
  };

  useEffect(() => {
    const debounceFN = setTimeout(() => {
      handleInputChange();
    }, 500);
    return () => clearTimeout(debounceFN);
  }, [query]);
  return (
    <>
      <div className="top-div h-[10vh] w-full bg-white shadow-md flex items-center justify-between px-1 fixed top-0 left-0 z-50 ">
        <img
          src={Logo}
          alt="instagram logo"
          className="w-32 object-cover ml-2 md:ml-8 "
          onClick={(e: any) => Navigate("/feed")}
        />
        <div className="sm:w-80">
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none h-10 bg-[rgb(228,224,224)] hover:bg-transparent focus:bg-transparent border py-1 px-2 mr-5 rounded-md "
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="hidden  sm:block ">
          <div className="text-2xl flex space-x-4 items-center cursor-pointer">
            <AiOutlineHome onClick={handleHomeIconClick} />

            <AiOutlinePlusCircle onClick={handlePlusIconClick} />

            <FaUserAlt onClick={handleUserIconClick} />
            <Button variant="contained" onClick={handleLogOut}>
              Log out
            </Button>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/search" element={<SearchUser user={user} />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default header;
