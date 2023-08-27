import { IoIosAddCircle } from "react-icons/io";
import "../Index.css";
import { useEffect, useState } from "react";
import StoryModal from "./StoryModal";
import { getDataWithJWT } from "../../service/axios.service";
import { jwtToken } from "../../utils/helper.utils";
import ViewStory from "./ViewStory";

const index = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = jwtToken();

  const [openStory, setOpenStory] = useState(false);
  const [stories, setStories] = useState<any>([]);
  const [currentStory, setCurrentStory] = useState<any>([]);

  //get all the stories
  const getStories = async () => {
    const response = await getDataWithJWT("users/getstory", token);
    setStories(response.userStories);
  };

  useEffect(() => {
    getStories();
  }, []);

  return (
    <div>
      <section className="w-full py-2 h-28 border border-gray-300  bg-white flex space-x-4 items-center  ">
        <div className="w-1 h-14"></div>

        {stories &&
          stories.map((story: any, index: number) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setOpenStory(true);
                  setCurrentStory(story.stories);
                }}
              >
                <div className="w-20 h-20 rounded-full p-1 border">
                  <img
                    src={
                      story.photo
                        ? story.photo
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZHZkZFOA8sW0MCEom45CGwmnJdl-RsK5n6-vEbSyqcYBvLBwkLTaYB8gjBXAO9ABhVs&usqp=CAU"
                    }
                    className="w-full h-full object-cover rounded-full "
                  />
                  <p>{story.userName}</p>
                </div>
              </button>
            );
          })}

        <button onClick={handleOpen}>
          <div className="w-20 h-20 rounded-full p-1 border relative ">
            <img
              src="data:image/jpeg;base64,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"
              className="w-full h-full object-cover rounded-full "
            />
            <IoIosAddCircle className="text-2xl absolute top-8 right-0" />
          </div>
        </button>

        <div className="w-1 h-14"></div>
      </section>
      {/* adding stories */}
      <StoryModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />

      {/* viewing stories */}
      <ViewStory
        openStory={openStory}
        setOpenStory={setOpenStory}
        story={currentStory}
      />
    </div>
  );
};

export default index;
