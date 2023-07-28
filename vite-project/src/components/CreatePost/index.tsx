import axios from "axios";
import { useState } from "react";

const index = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | null = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setPhoto(file);
    } else {
      setPhoto(null);
    }
  };

  const postDetails = async () => {
    if (photo) {
      const data = new FormData();
      data.append("file", photo);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "dcw");
      const response = await axios.post("");
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center mt-20 p-10">
      <div className="w-[40%] shadow-lg mt-3 px-5 pb-10">
        <p className="text-center font-bold text-xl mb-2">Create a post</p>

        <label
          htmlFor="email"
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
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <label
          htmlFor="email"
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
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
