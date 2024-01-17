import Layout from "@/components/Layout";
import Post from "../components/Post";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    try {
      const response = await axios.get("/api/posts");

      if (response.status === 200) {
        setPosts(response.data);
      } else {
        console.log("Failed to fetch posts");
      }
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Layout>
      {posts.map((post) => (
        <Post key={post._id} {...post} bigLayout={true}/>
      ))}
    </Layout>
  );
}
