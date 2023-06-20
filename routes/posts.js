import { Router } from "express";
import Post from "../models/Post.js";

const router = Router();

// реализовать метод получения всех постов GET /

router.get("/", async (req, res) => {
  const posts = await Post.find().populate("authorId");

  res.status(200).json(posts);
});

router.post("/", async (req, res) => {
  const { image, content, authorId } = req.body;

  const newPost = new Post({ image, content, authorId });

  await newPost.save();

  res.status(200).json({ result: "Post has been created!" });
});

router.put("/like/:postId", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  const thisPost = await Post.findOne({ _id: postId });

  if (thisPost.checkIsUserLiked(userId)) {
    res.status(400).json({ error: "This post is already liked by this user" });
    return;
  }

  thisPost.likedByUsers.push(userId);

  await thisPost.save();

  res.status(200).json({ result: "post has been liked" });
});

router.put("/unlike/:postId", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  const thisPost = await Post.findOne({ _id: postId });

  if (!thisPost.checkIsUserLiked(userId)) {
    res.status(400).json({ error: "This post hasnt been liked by this user" });
    return;
  }

  thisPost.likedByUsers.filter((elem) => elem !== userId);

  await thisPost.save();

  res.status(200).json({ result: "post has been unliked" });
});

export default router;
