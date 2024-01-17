import connectDB from "../../../utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import Post from "../../../models/Post";
const mongoose = require("mongoose");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Connect to MongoDB
      await connectDB();

      // Get the user's session
      const session = await getServerSession(req, res, authOptions);

      // Check if the user is authenticated
      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Extract post data from the request body
      const { cover, title, summary, content } = req.body;

      // Create a new post
      const newPost = new Post({
        cover,
        title,
        summary,
        content,
        author: session.user.id,
      });

      // Save the post to the database
      const savedPost = await newPost.save();
      return res.status(201).json(savedPost);
    } catch (err) {
      console.error("Error creating post:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      // Connect to MongoDB
      await connectDB();

      // Get the postId from the query parameters
      const { postId } = req.query;

      // Fetch the post from the database using the postId
      const post = await Post.findById(postId).populate({
        path: "author",
        select: "-password",
      });

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      return res.status(200).json(post);
    } catch (err) {
      console.error("Error fetching post:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
