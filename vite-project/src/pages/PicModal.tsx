import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  postFileInCloudinary,
  updateDataWithJWT,
} from "../service/axios.service";
import { jwtToken } from "../utils/helper.utils";

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

export default function BasicModal({ open, handleClose, handleOpen }: any) {
  const [photo, setPhoto] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const handleFileInput = useRef(null);
  const token = jwtToken();

  //post pic to cloudinary
  const postDetails = async () => {
    if (photo) {
      const data = new FormData();
      data.append("file", photo);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "dcw");

      const response = await postFileInCloudinary("/image/upload", data);

      if (response) {
        setImageUrl(response.secure_url);
      }
    }
  };

  useEffect(() => {
    postDetails();
  }, [photo]);

  //update data in mongodb
  useEffect(() => {
    const postToServer = async () => {
      if (imageUrl) {
        const postResponse = await updateDataWithJWT(
          "users/profilepic",
          { pic: imageUrl },
          token
        );
        if (postResponse) {
          console.log(postResponse);
          setPhoto(null);
          setImageUrl("");
        }
      }
    };
    postToServer();
  }, [imageUrl]);

  const handleUpload = () => {
    handleFileInput.current.click();
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
          <div className="text-center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Change Profile Pic
            </Typography>
            <hr />
            <div>
              <label htmlFor="upload-input">
                <Button variant="text" component="span" onClick={handleUpload}>
                  Upload
                </Button>
                <input
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={handleFileInput}
                  onChange={(e: any) => setPhoto(e.target.files[0])}
                />
              </label>
            </div>
            <hr />
            <Button variant="text" onClick={(e) => setPhoto(null)}>
              Remove
            </Button>
            <hr />
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
