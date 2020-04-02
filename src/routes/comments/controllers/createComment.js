const Comment = require("../commentSchema");

const createComment = async (request, response) => {
  try {
    const comment = request.body;
    const newComment = new Comment(comment);
    const commentToSave = await newComment.save();

    response.status(201).json({ status: "success", comment: commentToSave });
  } catch (error) {
    response.status(404).json({
      status: "error",
      message: error.message,
      text: "comment was not saved"
    });
  }
};

module.exports = createComment;
