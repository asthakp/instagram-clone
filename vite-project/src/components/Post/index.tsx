import { Button } from "@mui/material";
import React from "react";
import { BsBookmark, BsEmojiSmile, BsHeart, BsThreeDots } from "react-icons/bs";
import { FaRegComment, FaRegShareSquare } from "react-icons/fa";
import Instagram from "../../images/Instagram.png";

const index = () => {
  return (
    <div>
      <section className="mt-4 border-gray-300 border w-full bg-white shadow-white">
        <div className="flex flex-col space-y-2">
          {/* 1st div*/}
          <div className="flex px-4 justify-between items-center mt-4">
            <div className="flex space-x-2 items-center">
              <div className="w-10 h-10 border-gray-400 rounded-full">
                <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 to bg-fuchsia-500 rounded-full ring-2 ring-offset-2"></div>
              </div>
              <div className="font-semibold">username</div>
            </div>
            <div>
              <BsThreeDots />
            </div>
          </div>
          {/* 2nd div- picture*/}
          <div className="w-full aspect-video border">
            <img src={Instagram} alt="instagram logo" />
          </div>
          {/* 3rd div-like,comment,save*/}
          <div className="flex justify-between px-4">
            <div className="flex space-x-3">
              <div>
                <BsHeart size={20} />
              </div>
              <div>
                <FaRegComment size={20} />
              </div>
              <div>
                <FaRegShareSquare size={20} />
              </div>
            </div>
            <div>
              <BsBookmark size={20} />
            </div>
          </div>
          {/* 4th div-no of likes*/}
          <div className="px-4">1000 likes</div>
          {/* 5th div-comments*/}
          {new Array(3).fill(0).map((_, i) => (
            <div key={i} className="px-4 flex space-x-2">
              <span className="font-semibold">user</span>
              <span>Comment {i + 1}</span>
            </div>
          ))}
        </div>
        {/* 6th div-posted time*/}
        <div className="font-semibold px-4 mt-1 text-sm">2 weeks ago</div>
        {/* 7th div-comment writing section*/}
        <div className="px-4 py-1 border-b-gray-300 border-t-gray-300 border mt-1">
          <form className="flex space-x-4 items-center ">
            <BsEmojiSmile size={20} />
            <input
              type="text"
              placeholder="Add a comment..."
              className="outline-none w-full"
            />
            <Button variant="contained" type="submit">
              Post
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default index;
