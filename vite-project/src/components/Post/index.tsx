import { Button } from "@mui/material";
import { useState } from "react";
import {
  BsBookmark,
  BsEmojiSmile,
  BsHeart,
  BsHeartFill,
  BsThreeDots,
} from "react-icons/bs";
import { FaRegComment, FaRegShareSquare } from "react-icons/fa";
import { updateDataWithJWT } from "../../service/axios.service";
import { jwtToken } from "../../utils/helper.utils";
import { useDispatch } from "react-redux";
import { like } from "../../slice/auth.slice";

const index = ({ item }: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState<any>([]);
  const token = jwtToken();
  const dispatch=useDispatch()

  const handleLike = async (id: string) => {
    console.log(token);
  
    const response = await updateDataWithJWT(
      isLiked ? `posts/unlike/${id}` : `posts/like/${id}`,
      null,
      token
    );
    console.log(response);
    if (response.status) {
      // dispatch(like())
      setIsLiked(isLiked ? false : true);
    }
  };

  const makeComment = async (e: any, text: any, id: any) => {
    e.preventDefault();
    const response = await updateDataWithJWT(
      `posts/comment/${id}`,
      { text },
      token
    );
    console.log(response.data.comments);
    if (response.status) {
      setComment((prevComments: any) => [
        ...prevComments,
        response.data.comments[response.data.comments.length - 1],
      ]);
    }
    console.log(comment);
  };
  return (
    <section className="mt-4 border-gray-300 border w-full bg-white shadow-white">
      <div className="flex flex-col space-y-2">
        {/* 1st div*/}
        <div className="flex px-4 justify-between items-center mt-4">
          <div className="flex space-x-2 items-center">
            <div className="w-10 h-10 border-gray-400 rounded-full">
              <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 to bg-fuchsia-500 rounded-full ring-2 ring-offset-2"></div>
            </div>
            <div className="font-semibold">{item.postedBy.userName}</div>
          </div>
          <div>
            <BsThreeDots />
          </div>
        </div>
        {/* 2nd div- picture*/}
        <div className="w-full aspect-video border  ">
          <img
            src={item.photo}
            alt="ipicture"
            className="w-full object-cover h-96"
          />
        </div>
        {/* 3rd div-like,comment,save*/}
        <div className="flex justify-between px-4">
          <div className="flex space-x-3">
            <div>
              {isLiked ? (
                <BsHeartFill
                  size={20}
                  className="text-red-500"
                  onClick={(e: any) => handleLike(item._id)}
                />
              ) : (
                <BsHeart
                  size={20}
                  className="text-black"
                  onClick={(e: any) => handleLike(item._id)}
                />
              )}
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
        <div className="px-4">{item.likes.length} likes</div>
        <div className="flex space-x-2 px-4">
          <p className="font-semibold">{item.title}</p>
          <p>{item.body}</p>
        </div>
        {/* 5th div-comments*/}
        {comment.map((comm: any, i: number) => (
          <div key={i} className="px-4 flex space-x-2">
            <span className="font-semibold">
              {comm.postedBy?.userName || "Unknown User"}
            </span>
            <span>{comm.text}</span>
          </div>
        ))}
      </div>
      {/* 6th div-posted time*/}
      <div className="font-semibold px-4 mt-1 text-sm">2 weeks ago</div>
      {/* 7th div-comment writing section*/}
      <div className="px-4 py-1 border-b-gray-300 border-t-gray-300 border mt-1">
        <form
          className="flex space-x-4 items-center "
          onSubmit={(e: any) => makeComment(e, e.target[0].value, item._id)}
        >
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
  );
};

export default index;
