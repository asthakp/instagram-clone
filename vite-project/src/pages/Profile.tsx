import React from "react";
import image from "../images/Instagram.png";

const Profile = () => {
  return (
    <div className="w-[60%] shadow-lg px-14 mt-20 mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <img
            src={image}
            alt="profile pic"
            className="w-20 h-20 object-contain rounded-full border"
          />
          <p className="font-semibold mt-1">User name</p>
        </div>
        <div className="flex space-x-10">
          <div className="posts ">
            <span>40 posts</span>
          </div>
          <div className="followers">
            <span>40 followers</span>
          </div>
          <div className="following">
            <span>40 following</span>
          </div>
        </div>
      </div>
      <hr className="w-full h-2 mt-3 mt-3" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <img
          src={image}
          alt="profile pic"
          className="w-52 h-52 object-contain  border"
        />
        <img
          src={image}
          alt="profile pic"
          className="w-52 h-52 object-contain  border"
        />
        <img
          src={image}
          alt="profile pic"
          className="w-52 h-52 object-contain  border"
        />
        <img
          src={image}
          alt="profile pic"
          className="ww-52 h-52 object-contain  border"
        />
      </div>
    </div>
  );
};

export default Profile;
