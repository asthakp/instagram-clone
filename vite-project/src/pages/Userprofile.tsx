import React, { useEffect, useState } from "react";
import image from "../images/Instagram.png";
import { getDataWithJWT, updateDataWithJWT } from "../service/axios.service";
import { jwtToken } from "../utils/helper.utils";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

const Profile = () => {
  const [userPosts, setUserPosts] = useState<any>([]);
  const [user, setUser] = useState<any>({});
  const [status, setStatus] = useState<any>(false);

  const token = jwtToken();
  const { loggedUser } = useSelector((state: any) => state.auth);
  const { id } = useParams();
  const [follow, setFollow] = useState(false);

  const getUserPosts = async () => {
    const response = await getDataWithJWT(`users/${id}`, token);
    if (response.status) {
      setUserPosts(response.data.posts);
      setUser(response.data.user);
      setStatus(response.status);
      if (response.data.user.followers.includes(loggedUser)) {
        setFollow(true);
      }
    }
  };

  useEffect(() => {
    getUserPosts();
  }, [follow]);

  const followUser = async (userId: any) => {
    console.log(userId);
    const response = await updateDataWithJWT(
      `users/follow/${userId}`,
      null,
      token
    );
    if (response.status) {
      setFollow(true);
      // setUserData(response.data);
      // console.log(response.data);
    }
  };

  const unfollowUser = async (userId: any) => {
    console.log(userId);
    const response = await updateDataWithJWT(
      `users/unfollow/${userId}`,
      null,
      token
    );
    if (response.status) {
      setFollow(false);
      // setUserData(response.data);
      // console.log(response.data);
    }
  };

  return (
    <>
      {status && (
        <div className="w-[60%] shadow-lg px-14 mt-20 mx-auto min-h-[500px]">
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center space-x-4">
              <img
                src={
                  user.photo
                    ? user.photo
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZHZkZFOA8sW0MCEom45CGwmnJdl-RsK5n6-vEbSyqcYBvLBwkLTaYB8gjBXAO9ABhVs&usqp=CAU"
                }
                alt="profile pic"
                className="w-28 h-28 object-contain rounded-full border"
              />
              <div>
                <p className="font-semibold mt-1 text-xl"></p>
                <Button
                  variant="contained"
                  onClick={(e) =>
                    follow
                      ? unfollowUser(userPosts[0].postedBy._id)
                      : followUser(userPosts[0].postedBy._id)
                  }
                >
                  {follow ? "Unfollow" : "Follow"}
                </Button>
              </div>
            </div>
            <div className="flex space-x-10">
              <div className="posts ">
                <span>{userPosts.length} posts</span>
              </div>

              <div className="followers">
                <span>{user.followers.length}followers</span>
              </div>
              <div className="following">
                <span>{user.following.length}following</span>
              </div>
            </div>
          </div>
          <hr className="w-full h-2 mt-3 " />

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
        </div>
      )}
    </>
  );
};

export default Profile;
