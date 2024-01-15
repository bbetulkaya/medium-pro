import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import Layout from "@/components/Layout";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
// Import the Quill editor component dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  async function handleCreatePost(e) {
    e.preventDefault();
    const response = await axios.post("/api/posts", {
      title,
      summary,
      content,
    });

    console.log(response);
  }
  return (
    <Layout>
      <div>
        <h1>Create a New Post</h1>
        <form onSubmit={handleCreatePost}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Summary:
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </label>
          <br />
          <label>
            Content:
            <ReactQuill
              value={content}
              onChange={(value) => setContent(value)}
            />
          </label>
          <br />
          <button type="submit">Create Post</button>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePost;
