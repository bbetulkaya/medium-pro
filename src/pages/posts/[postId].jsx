import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import Post from "@/components/Post";
const PostPage = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState([]);

  function fetchPostData(id) {
    axios
      .get(`/api/posts?postId=${id}`)
      .then((response) => {
        // Handle the response data
        console.log(response.data);
        setPost(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching post data:", error);
      });
  }

  useEffect(() => {
    if (!postId) {
      console.log("PostPage doesn't have post Id!");
      return;
    }
    fetchPostData(postId);
  }, [postId]);

  return (
    <Layout>
      <div>
        <Post {...post} bigLayout={true} />
      </div>
    </Layout>
  );
};

export default PostPage;
