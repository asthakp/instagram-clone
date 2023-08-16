import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  postDataWithJWT,
  postFileInCloudinary,
} from "../../service/axios.service";
import { jwtToken } from "../../utils/helper.utils";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StoryModal = ({ open, handleClose, handleOpen }: any) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const token = jwtToken();

  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    const postToServer = async () => {
      if (imageUrl) {
        const postResponse = await postDataWithJWT(
          "users/addstory",
          { image: imageUrl },
          token
        );
        if (postResponse) {
          console.log(postResponse);
          setImage(null);
          setImageUrl("");
          handleClose();
        }
      }
    };
    postToServer();
  }, [imageUrl]);

  const postDetails = async () => {
    if (image) {
      const data = new FormData();
      await data.append("file", image);
      await data.append("upload_preset", "insta-clone");
      await data.append("cloud_name", "dcw");
      const response = await postFileInCloudinary("/image/upload", data);
      if (response) {
        setImageUrl(response.secure_url);
      }
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Choose a file
          </Typography>
          <label>
            <input
              type="file"
              className="mb-4"
              onChange={(e: any) => handleChange(e)}
            />
          </label>
          <Button variant="contained" className="mr-2" onClick={postDetails}>
            {" "}
            Upload
          </Button>
          <Button variant="outlined" className="ml-2" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default StoryModal;
