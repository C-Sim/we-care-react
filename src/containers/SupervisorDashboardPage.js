// For each user type to view top level information most relevant to them - may need to split into 3, but use first created as template for others
import React, { useState } from "react";
import S3 from "react-aws-s3";

window.Buffer = window.Buffer || require("buffer").Buffer;

export const SupervisorDashboardPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const config = {
    bucketName: "wecarebootcampappbucket",
    region: "eu-west-1",
    accessKeyId: "AKIARTUKNU3XDMNUERHG",
    secretAccessKey: "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",
  };
  const upload = () => {
    const ReactS3Client = new S3(config);

    const fileName = "test";
    ReactS3Client.uploadFile(selectedFile, fileName)
      .then((data) => {
        console.log(data.location);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <h1>SupervisorDashboardPage</h1>
      <h3>Displaying a test image here with the aws bucket image url:</h3>
      <div>
        <img src="https://wecarebootcampappbucket.s3.eu-west-1.amazonaws.com/avatar3.png" />
      </div>
      <h3>Displaying below the form to upload an image to the aws bucket:</h3>
      <form onSubmit={upload}>
        <h3>Upload your image</h3>
        <input type="file" onChange={handleFileInput} />
        <button type="submit">Upload image</button>
      </form>
    </>
  );
};
