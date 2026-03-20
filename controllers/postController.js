const Post = require("../models/Post");

// ✅ CRÉER POST
exports.createPost = async (req, res) => {
  try {
    const { userId, text, image, video } = req.body;

    const post = new Post({
      user: userId,
      text,
      image,
      video
    });

    await post.save();

    res.json({
      message: "Post créé",
      post
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ RÉCUPÉRER TOUS LES POSTS
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❤️ LIKE
exports.likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    const post = await Post.findById(postId);

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      message: "Post liké",
      likes: post.likes.length
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 💬 COMMENTAIRE
exports.commentPost = async (req, res) => {
  try {
    const { postId, userId, text } = req.body;

    const post = await Post.findById(postId);

    post.comments.push({
      user: userId,
      text
    });

    await post.save();

    res.json({
      message: "Commentaire ajouté",
      comments: post.comments
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};