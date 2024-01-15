import { getSession } from "next-auth/react";
import connectDB from "../../../utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import Post from "../../../models/Post";

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
      const { title, summary, content } = req.body;

      // Create a new post
      const newPost = new Post({
        title,
        summary,
        content,
        author: session.user.id,
      });

      // Save the post to the database
      const savedPost = await newPost.save();
    } catch (err) {}
  }
}
