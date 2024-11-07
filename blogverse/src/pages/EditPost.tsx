import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/auth/config";
import { Container, PostForm } from "../components";

interface PostDocument {
 $id: string; // Make sure $id is present
 title: string;
 slug: string;
 content: string;
 status: "active" | "inactive";
 featuredimg?: string;
}

function EditPost() {
 const [post, setPost] = useState<PostDocument | undefined>(); // Set the state to PostDocument
 const { slug } = useParams();
 const navigate = useNavigate();

 useEffect(() => {
  if (slug) {
   appwriteService.getPost(slug).then((fetchedPost: any) => {
    if (fetchedPost) {
     setPost(fetchedPost);
    }
   });
  } else {
   navigate("/"); // Navigate if no slug is present
  }
 }, [slug, navigate]);

 return post ? (
  <div className="py-8">
   <Container>
    <PostForm post={post} />
   </Container>
  </div>
 ) : null;
}

export default EditPost;
