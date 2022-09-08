import { useState } from "react";
import { uploadFile } from "react-s3";
import ImageUploading from "react-images-uploading";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import uuid from "react-uuid";

window.Buffer = window.Buffer || require("buffer").Buffer;

export const ImageUploader = ({ imageUrl, setImageUrl, setFileName }) => {
  const [images, setImages] = useState([]);

  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_ACCESS_ID,
  };

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const onUpload = async () => {
    console.log(config);
    try {
      const uniqueId = uuid();
      const file = images[0].file;
      const newFile = new File([file], `${uniqueId}`);

      const s3Data = await uploadFile(newFile, config);

      if (s3Data?.location) {
        console.log(s3Data);
        setImageUrl(s3Data.location);
        setImages([]);
        setFileName(s3Data.key);
      } else {
        console.log("Failed to upload image.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const classes = {
    root: {
      width: "50%",
    },
    media: { height: "400px" },
    profileImageMedia: {
      height: 150,
      width: 150,
      borderRadius: 100,
      textAlign: "center",
      marginBottom: 2,
    },
    title: {
      textAlign: "center",
      paddingTop: 2,
      paddingBottom: 2,
    },
    cardActions: { display: "flex", justifyContent: "space-evenly" },
  };

  return (
    <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
      {({ imageList, onImageUpload, onImageRemoveAll }) => (
        <div className="upload__image-wrapper">
          <Card className={classes.root}>
            <CardActionArea>
              {images.length !== 0 && (
                <>
                  <Typography
                    variant="h6"
                    display="block"
                    className={classes.title}
                  >
                    Preview
                  </Typography>
                  <CardMedia
                    sx={{ height: "600px" }}
                    image={images[0]["data_url"]}
                  />
                </>
              )}
              {imageUrl && (
                <>
                  <Typography
                    variant="h6"
                    display="block"
                    className={classes.title}
                  >
                    Uploaded Image
                  </Typography>
                  <CardMedia className={classes.media} image={imageUrl} />
                </>
              )}
              <CardContent>
                {imageUrl && (
                  <Typography variant="caption" display="block" gutterBottom>
                    {imageUrl}
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
            <CardActions>
              {imageList.length === 0 && (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={onImageUpload}
                >
                  <PhotoCamera />
                </IconButton>
              )}
              {imageList.length !== 0 && (
                <Button
                  variant="contained"
                  color="secondary"
                  component="span"
                  onClick={onImageRemoveAll}
                >
                  Delete
                </Button>
              )}
              {imageList.length !== 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  onClick={onUpload}
                >
                  Upload
                </Button>
              )}
            </CardActions>
          </Card>
        </div>
      )}
    </ImageUploading>
  );
};
