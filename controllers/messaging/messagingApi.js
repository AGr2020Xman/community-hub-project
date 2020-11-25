// Dependencies
const express = require("express");
const router = express.Router();

// Setup Firebase
const db = require("../../config/initFirebase");

// Retrieve wall messages
router.get("/api/posts/:namespace", (req, res) => {
  const postsRef = db
    .collection("posts")
    .where("namespace", "==", req.params.namespace)
    .orderBy("timestamp", "asc");
  postsRef.get().then((docs) => {
    const posts = {};
    docs.forEach((post) => {
      posts[post.id] = {
        ...post.data(),
      };
    });
    return res.json(posts);
  });
});

module.exports = router;
