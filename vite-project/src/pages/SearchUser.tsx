import React from "react";
import { Link } from "react-router-dom";

const SearchUser = ({ user }: any) => {
  console.log(user);
  return (
    <div className="w-full max-w-screen-lg h-full border-blue-500 mt-20">
      <div className="flex gap-2 items-center">
        {user &&
          user.length > 0 &&
          user.map((item: any) => (
            <Link to={`/usersprofile/${item._id}`} key={item._id}>
              <img
                className="w-10 h-10 object-cover rounded-full"
                src={
                  item.photo
                    ? item.photo
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZHZkZFOA8sW0MCEom45CGwmnJdl-RsK5n6-vEbSyqcYBvLBwkLTaYB8gjBXAO9ABhVs&usqp=CAU"
                }
                alt="User Profile"
              />
              <p>{item.userName}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchUser;
