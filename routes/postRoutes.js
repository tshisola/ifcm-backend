const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// 🔥 IMPORT MULTER
const upload = require("../config/upload");

// ✅ CRÉER POST AVEC IMAGE / VIDÉO
router.post("/create", upload.single("file"), postController.createPost);

// ✅ RÉCUPÉRER TOUS LES POSTS
router.get("/", postController.getPosts);

// ❤️ LIKE POST
router.post("/like", postController.likePost);

// 💬 COMMENTAIRE POST
router.post("/comment", postController.commentPost);

module.exports = router;;