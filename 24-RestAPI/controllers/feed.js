exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: "First Post", content: "This is the First post!" }],
  });
};

exports.postPosts = (req, res, next) => {
  // create post in db
  const { title, content } = req.body;
  res.status(201).json({
    message: "Post created successfully",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
