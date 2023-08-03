import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  BsBookmark,
  BsEmojiSmile,
  BsHeart,
  BsHeartFill,
  BsThreeDots,
} from "react-icons/bs";
import { FaRegComment, FaRegShareSquare } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import {
  deleteDataWithJWT,
  getDataWithJWT,
  updateDataWithJWT,
} from "../../service/axios.service";
import { jwtToken } from "../../utils/helper.utils";
import { useDispatch, useSelector } from "react-redux";
import { like } from "../../slice/auth.slice";
import { Dropdown } from "react-bootstrap";
import { successToast } from "../../service/toastify.service";
import { useNavigate } from "react-router-dom";

const index = ({ item, filterItems }: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState<any>([]);
  const { loggedUser } = useSelector((state: any) => state.auth);
  const token = jwtToken();
  const navigate = useNavigate();

  const getPost = async () => {
    const response = await getDataWithJWT("posts", token);
    response.data.map((post: any) => {
      post.likes.includes(loggedUser) ? setIsLiked(true) : setIsLiked(false);
    });
  };

  useEffect(() => {
    getPost();
  });

  const handleLike = async (id: string) => {
    const response = await updateDataWithJWT(
      isLiked ? `posts/unlike/${id}` : `posts/like/${id}`,
      null,
      token
    );
    // console.log(response);
    // if (response.status) {
    //   response.data.likes.includes(loggedUser)
    //     ? setIsLiked(true)
    //     : setIsLiked(false);
    // }
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
  const handlePostDel = async (e: any, postId: string) => {
    e.preventDefault();
    const response = await deleteDataWithJWT(`posts/${postId}`, token);
    if (response.status) {
      filterItems(postId);
      successToast(response.message);
    }
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
            <div
              className="font-semibold hover:underline hover:cursor-pointer"
              onClick={(e: any) =>
                loggedUser === item.postedBy._id
                  ? navigate("/profile")
                  : navigate(`/usersprofile/${item.postedBy._id}`)
              }
            >
              {item.postedBy.userName}
            </div>
          </div>
          <div>
            {item.postedBy._id === loggedUser && (
              <AiOutlineDelete
                onClick={(e: any) => handlePostDel(e, item._id)}
              />
            )}
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
