import React from "react";
import "../Index.css";

const index = () => {
  return (
    <div>
      <section className="w-full h-[15vh] border border-gray-300  bg-white flex space-x-4 items-center  ">
        <div className="w-1 h-14"></div>
        {new Array(10).fill(0).map((_, i) => {
          return (
            <div
              key={i}
              className="story w-14 h-14  ring-2 ring-offset-2 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600"
            />
          );
        })}
        <div className="w-1 h-14"></div>
      </section>
    </div>
  );
};

export default index;
