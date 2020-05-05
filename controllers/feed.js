const { validationResult } = require("express-validator/check");

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({ posts: posts });
    })
    .catch((err) => {
      errorHandler(err);
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/dummy.jpg",
    creator: { name: "Marija" },
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        post: result,
      });
    })
    .catch((err) => {
      errorHandler(err);
      next(err);
    });
}; 

const errorHandler = (err) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
};
