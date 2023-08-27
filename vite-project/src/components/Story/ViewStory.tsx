import React, { useState } from "react";
import Stories from "react-insta-stories";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";

const ViewStory = ({ openStory, setOpenStory, story }: any) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const storyLine = story && story.map(({ storyPic }: any) => storyPic);

  const storyContent = {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
  };

  const closeModal = () => {
    setOpenStory(false);
    setCurrentStoryIndex(0); // Reset the story index
  };

  const handleAllStoriesEnd = () => {
    closeModal();
  };

  return (
    <Modal
      isOpen={openStory}
      onRequestClose={closeModal} // Close modal when clicking outside or pressing Esc
      ariaHideApp={false}
      className="storyModal"
      contentLabel="view story"
      style={{
        content: {
          maxWidth: "95%",
          margin: "0 auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
        overlay: {
          zIndex: 9999,
        },
      }}
    >
      <div style={{ position: "relative" }}>
        {/* Close icon */}
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={closeModal}
        >
          <IoClose size={24} />
        </button>
        <Stories
          stories={storyLine}
          defaultInterval={1500}
          width={432}
          height={768}
          storyStyles={storyContent}
          currentIndex={currentStoryIndex}
          onAllStoriesEnd={handleAllStoriesEnd}
          onStoryEnd={() => setCurrentStoryIndex((prevIndex) => prevIndex + 1)}
        />
      </div>
    </Modal>
  );
};

export default ViewStory;
