const Image = require("../imageSchema");
const User = require("../../users/userSchema");
const path = require("path");
const { port } = require("../../../../config");
const getToken = require("../../../helpers/getToken");

const saveImage = async (request, response) => {
  try {
    const token = getToken(request);
    if (!token) {
      return response.status(403).send({
        status: "failed",
        message: "No token provided"
      });
    }
    const body = request.body;
    const userId = body.userId;
    const imagePath = body.file.path;
    const imageStats = path.parse(imagePath);
    const imageUrl = `http://localhost:${port}/` + imageStats.base;
    imageData = {
      userId: userId,
      file: imageUrl
    };

    const newImage = new Image(imageData);
    const ImageToSave = await newImage.save();

    const user = await User.findById(userId);
    const userImages = user.images;
    userImages.push(imageUrl);

    await User.findOneAndUpdate(
      { _id: ImageToSave.userId },
      { images: userImages },
      { new: true }
    );

    response.status(201).json({
      status: "success",
      image: ImageToSave
    });
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error.message,
      text: "image was not saved"
    });
  }
};

module.exports = saveImage;
