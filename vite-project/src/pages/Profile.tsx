import React, { useEffect, useState } from "react";
import image from "../images/Instagram.png";
import { getDataWithJWT } from "../service/axios.service";
import { jwtToken } from "../utils/helper.utils";
import { useSelector } from "react-redux";
import PicModal from "./PicModal";
import "./index.css";

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState<any>({});

  const token = jwtToken();
  const { loggedUser } = useSelector((state: any) => state.auth);

  const getUserPosts = async () => {
    const response = await getDataWithJWT(`users/${loggedUser}`, token);
    if (response.status) {
      setUserPosts(response.data.posts);
      setUser(response.data.user);
    }
  };
  useEffect(() => {
    getUserPosts();
  }, []);

  //Profile pic of users
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="profile w-full sm:w-[60%] shadow-lg px-14  mx-auto min-h-[550px]">
      <div className="flex justify-between items-center">
        <div>
          <img
            src={
              user.photo
                ? user.photo
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZHZkZFOA8sW0MCEom45CGwmnJdl-RsK5n6-vEbSyqcYBvLBwkLTaYB8gjBXAO9ABhVs&usqp=CAU"
            }
            alt="profile pic"
            className="w-20 h-20 object-cover rounded-full border"
            onClick={handleOpen}
          />
          <p className="font-semibold mt-1"></p>
        </div>
        <div className="flex flex-col justify-start md:flex-row space-x-4">
          <div className="posts ">
            <span>{userPosts.length}posts</span>
          </div>
          <div className="followers">
            <span>{user.followers ? user.followers.length : 0} followers</span>
          </div>
          <div className="following">
            <span>{user.following ? user.following.length : 0} following</span>
          </div>
        </div>
      </div>
      <hr className="w-full h-2 mt-3 mt-3" />
      {userPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userPosts.map((post: any) => {
            return (
              <div className="w-52 h-52" key={post._id}>
                <img
                  src={post.photo}
                  alt="post pic"
                  className=" object-cover  border w-full h-full"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[300px]">
          <p className="text-xl">No posts</p>
        </div>
      )}
      <PicModal open={open} handleClose={handleClose} handleOpen={handleOpen} />
    </div>
  );
};

export default Profile;
