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

const index = ({
  item,
  filterItems,
  showLike,
  showUnLike,
  showComment,
}: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState<any>("");
  const { loggedUser } = useSelector((state: any) => state.auth);
  const token = jwtToken();
  const navigate = useNavigate();

  //check if the post is liked on the first page load
  const checkLike = () => {
    if (item.likes.includes(loggedUser)) {
      setIsLiked(true);
    }
  };
  useEffect(() => {
    checkLike();
  }, []);

  // useEffect(() => {
  //   showLike()
  // }, [isLiked]);

  const handleLike = async (id: string) => {
    const response = await updateDataWithJWT(`posts/like/${id}`, null, token);
    if (response.status) {
      setIsLiked(true);

      showLike(response.data, id);
    }
  };

  const handleUnLike = async (id: string) => {
    const response = await updateDataWithJWT(`posts/unlike/${id}`, null, token);
    if (response.status) {
      setIsLiked(false);
      console.log(response);
      showUnLike(response.data, id);
    }
  };

  const makeComment = async (e: any, text: any, id: any) => {
    e.preventDefault();
    const response = await updateDataWithJWT(
      `posts/comment/${id}`,
      { text },
      token
    );
    console.log(response.data);
    if (response.status) {
      showComment(response.data, id);
    }
    // if (response.status) {
    //   setComment((prevComments: any) => {
    //     return [
    //       ...prevComments,
    //       response.data.comments[response.data.comments.length - 1],
    //     ];
    //   });
    // }
    // console.log(comment);
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
              <img
                src={
                  item.postedBy.photo
                    ? item.postedBy.photo
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZHZkZFOA8sW0MCEom45CGwmnJdl-RsK5n6-vEbSyqcYBvLBwkLTaYB8gjBXAO9ABhVs&usqp=CAU"
                }
                alt="profile pic"
                className="w-10 h-10 object-contain rounded-full border"
              />
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
            src={item.photo ? item.photo : ""}
            alt="picture"
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
                  onClick={(e: any) => handleUnLike(item._id)}
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

        {item.comments.map((comm: any, i: number) => (
          <div key={i} className="px-4 flex space-x-2">
            <span className="font-semibold">
              {comm.postedBy.userName ? comm.postedBy.userName : "Unknown User"}
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
          onSubmit={(e: any) => makeComment(e, comment, item._id)}
        >
          <BsEmojiSmile size={20} />
          <input
            type="text"
            placeholder="Add a comment..."
            className="outline-none w-full"
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
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
