import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/auth/config";

// Define types for the post and user data
interface UserData {
 $id: string;
}

interface Post {
 $id: string;
 title: string;
 content: string;
 featuredimg: string;
 userid: string;
}

export default function Post() {
 const [post, setPost] = useState<Post | null>(null);
 const { slug } = useParams();
 const navigate = useNavigate();

 // Properly type the state in useSelector hook
 const userData = useSelector((state: { auth: { userData: UserData | null } }) => state.auth.userData);

 // Check if the current user is the author of the post
 const isAuthor = post && userData ? post.userid === userData.$id : false;

 useEffect(() => {
  if (slug) {
   // Get the post data from the appwriteService
   appwriteService.getPost(slug).then((fetchedPost) => {
    if (fetchedPost) {
     // Map fetchedPost (PostDocument) to Post
     const mappedPost: Post = {
      $id: fetchedPost.$id,
      title: fetchedPost.title,
      content: fetchedPost.content,
      featuredimg: fetchedPost.featuredimg,
      userid: fetchedPost.userid,
     };
     setPost(mappedPost);
    } else {
     navigate("/"); // Navigate to homepage if no post found
    }
   });
  } else {
   navigate("/"); // Navigate to homepage if no slug is provided
  }
 }, [slug, navigate]);

 // Delete the post
 const deletePost = () => {
  if (post) {
   appwriteService.deletePost(post.$id).then((status) => {
    if (status) {
     // Delete the featured image if the post is successfully deleted
     appwriteService.deleteFile(post.featuredimg);
     navigate("/"); // Navigate to the homepage
    }
   });
  }
 };

 return post ? (
  <div className="py-8">
   <Container>
    <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
     <img src={appwriteService.getFilePreview(post.featuredimg)} alt={post.title} className="rounded-xl" />

     {isAuthor && (
      <div className="absolute right-6 top-6">
       <Link to={`/edit-post/${post.$id}`}>
        <Button bgColor="bg-green-500" className="mr-3">
         Edit
        </Button>
       </Link>
       <Button bgColor="bg-red-500" onClick={deletePost}>
        Delete
       </Button>
      </div>
     )}
    </div>
    <div className="w-full mb-6">
     <h1 className="text-2xl font-bold">{post.title}</h1>
    </div>
    <div className="browser-css">{parse(post.content)}</div>
   </Container>
  </div>
 ) : null;
}
