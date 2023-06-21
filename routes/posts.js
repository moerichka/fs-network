import { Router } from "express";
import Post from "../models/Post.js";

const router = Router();

// реализовать метод получения всех постов GET /

// api/posts?page=1&limit=9

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;

  const offset = (page - 1) * limit;

  const posts = await Post.find()
    .limit(limit)
    .skip(offset)
    .populate("authorId");

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
