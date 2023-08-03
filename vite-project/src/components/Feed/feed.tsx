import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Post from "../Post/index";
import Story from "../Story/index";
import { getDataWithJWT } from "../../service/axios.service";
import { jwtToken } from "../../utils/helper.utils";

const feed = () => {
  const [posts, setPosts] = useState<any>([]);
  const token = jwtToken();

  const getPosts = async () => {
    const response = await getDataWithJWT("posts", token);
    if (response.status) {
      setPosts(response.data);
    }
  };
  const filterItems = (postId: any) => {
    const filteredposts = posts.filter((post: any) => {
      return post._id !== postId;
    });
    setPosts(filteredposts);
  };
  // const showLike = (response: any, postId: any) => {
  //   const likedPost = posts.map((post: any) => {
  //     postId === post._id ? response : post;
  //   });
  //   setPosts(likedPost);
  // };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="w-full h-full bg-[#FAFAFA]">
      <Header />
      <div className="w-full max-w-screen-lg grid grid-cols-3 mt-20 mx-auto gap-4 ">
        <div className="w-full min-h-full col-span-2">
          <Story />
          <div className="flex flex-col space-y-10">
            {posts.map((item: any, i: any) => {
              return (
                <div key={i}>
                  <Post item={item} filterItems={filterItems} />
                </div>
              );
            })}
          </div>
        </div>
        {/* for sidebar*/}
        <div className=" bg-white px-5 fixed  right-[10%] w-[25%] top-[12.5%]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
          ratione sint facilis nesciunt, doloribus consequuntur excepturi ab
          molestias repellendus illo consequatur ipsa officia, deserunt soluta
          sit odit unde at esse ex officiis fugiat. Earum quas in excepturi eum
          cum? Porro, at dicta rem in dolores fugit natus fugiat earum magnam?
        </div>
      </div>
    </div>
  );
};

export default feed;
