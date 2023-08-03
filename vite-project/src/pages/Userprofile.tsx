import React, { useEffect, useState } from "react";
import image from "../images/Instagram.png";
import { getDataWithJWT } from "../service/axios.service";
import { jwtToken } from "../utils/helper.utils";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [userPosts, setUserPosts] = useState<any>([]);
  const token = jwtToken();
  const { loggedUser } = useSelector((state: any) => state.auth);
  const { id } = useParams();

  const getUserPosts = async () => {
    const response = await getDataWithJWT(`users/${id}`, token);
    if (response.status) {
      setUserPosts(response.data.posts);
      console.log(userPosts);
    }
  };
  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <div className="w-[60%] shadow-lg px-14 mt-20 mx-auto min-h-[500px]">
      <div className="flex justify-between items-center">
        <div>
          <img
            src={image}
            alt="profile pic"
            className="w-20 h-20 object-contain rounded-full border"
          />
          <p className="font-semibold mt-1"></p>
        </div>
        <div className="flex space-x-10">
          <div className="posts ">
            <span>{userPosts.length} posts</span>
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
  );
};

export default Profile;
