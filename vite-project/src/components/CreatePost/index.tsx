import axios from "axios";
import { useEffect, useState } from "react";
import {
  postDataWithJWT,
  postFileInCloudinary,
} from "../../service/axios.service";
import { Button } from "@mui/material";
import { jwtToken } from "../../utils/helper.utils";
import { errorToast, successToast } from "../../service/toastify.service";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const token = jwtToken();
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | null = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setPhoto(file);

      // To preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
      setImagePreviewUrl(null);
    }
  };

  useEffect(() => {
    const postToServer = async () => {
      if (imageUrl) {
        const postResponse = await postDataWithJWT(
          "posts",
          { title, body, photo: imageUrl },
          token
        );
        if (postResponse) {
          setTitle("");
          setBody("");
          setPhoto(null);
          setImageUrl("");
          setImagePreviewUrl(null);
          navigate("/feed");
        }
      }
    };

    postToServer();
  }, [imageUrl, title, body, photo, token]);

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

  return (
    <div className="w-full h-full flex items-center justify-center mt-20 p-10">
      <div className="w-[40%] shadow-lg mt-3 px-5 pb-10">
        <p className="text-center font-bold text-xl mb-2">Create a post</p>

        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Title
        </label>
        <div className="mt-2">
          <input
            id="title"
            name="title"
            type="text"
            autoComplete="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <label
          htmlFor="body"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Body
        </label>
        <div className="mt-2">
          <input
            id="body"
            name="body"
            type="text"
            autoComplete="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Upload
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 mb-2">
            <div className="text-center">
              {/* Custom styled label */}
              <label htmlFor="file-upload" className="relative cursor-pointer">
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt="Image Preview"
                    className="w-full h-40 rounded-lg bg-cover bg-center bg-no-repeat"
                  />
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm leading-6 text-gray-600 mt-4">
                      Upload a file
                    </p>
                  </>
                )}

                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>

        <Button variant="contained" onClick={postDetails}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Index;
