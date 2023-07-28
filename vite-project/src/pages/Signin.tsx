import { Link, useNavigate } from "react-router-dom";
import GooglePlay from "../images/google-play.png";
import Microsoft from "../images/microsoft.png";
import Logo from "../images/Instagram.png";
import { useEffect, useState } from "react";
import { postData } from "../service/axios.service";
import { errorToast, successToast } from "../service/toastify.service";

const Signin = () => {
  const [disabled, setDisabled] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      userName,
      password,
    };
    const response = await postData("users/login", data);
    if (response.status) {
      successToast(response.message);
      navigate("/feed");
    } else {
      errorToast(response.message);
    }
  };

  useEffect(() => {
    // Validate each input field individually
    const isAnyValueEmpty = userName.trim() === "" || password.trim() === "";

    setDisabled(isAnyValueEmpty);
  }, [userName, password]);

  return (
    <div className="flex justify-center text-center">
      <div className="flex flex-col gap-[10px] text-center mt-11 ">
        <div className=" border border-gray-300 px-10 pt-11">
          <img
            src={Logo}
            alt="logo"
            className="w-52 object-cover pl-10 mb-[40px]"
          />
          <div className="my-4 flex flex-col gap-1">
            <input
              type="text"
              placeholder="Username "
              name="userName"
              onChange={(e) => setUserName(e.target.value)}
              className="border border-gray-300 text-sm bg-[rgb(250,250,250)] h-9 outline-slate-400 px-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 text-sm bg-[rgb(250,250,250)] h-9  outline-slate-400 px-2 rounded"
            />
          </div>
          <button
            onClick={(e) => handleSubmit(e)}
            disabled={disabled}
            className={`${
              disabled ? "bg-[rgb(0,149,246,0.5)]" : "bg-[rgb(0,149,246)]"
            } text-white text-center py-1 px-12 rounded-lg font-semibold mb-5  w-full`}
          >
            Log In
          </button>

          <div className="flex items-center">
            <span className=" bg-gray-300 w-24 h-[1px]"></span>
            <p className="text-[rgb(115,115,133)] px-4 ms-2 font-semibold text-sm">
              OR
            </p>
            <span className=" bg-gray-300 w-24 h-[1px] "></span>
          </div>
          <button className="my-5 font-semibold text-[rgb(62,81,141)]">
            Log in with Facebook
          </button>
          <button className="text-[rgb(62,81,141)] text-sm mb-4 block ml-24">
            forgot password?
          </button>
        </div>
        <div className="flex justify-center items-center border border-gray-300 h-16 mb-5 ">
          Dont have an account?{" "}
          <span className="text-[rgb(0,55,107)]">
            <Link to="/"> Sign up</Link>
          </span>
        </div>
        <p className="mb-5">Get the app</p>
        <div className="flex gap-[10px] mx-9 mb-12">
          <Link to="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D1A12AD59-A3E5-417D-B2A8-2AA6706419E5%26utm_campaign%3DsignupPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge&pli=1">
            {" "}
            <img src={GooglePlay} className="w-[140px] h-[38px]" />
          </Link>
          <img src={Microsoft} className="w-[140px] h-[38px]" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
