import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/auth/config";

// Define the structure of a Post
interface Post {
 $id: string;
 title: string;
 content: string;
 featuredimg: string;
}

interface PostsResponse {
 documents: Post[];
}

function AllPosts() {
 // Correctly type the posts state as an array of Post objects
 const [posts, setPosts] = useState<Post[]>([]);

 useEffect(() => {
  // Fetch posts when the component mounts
  const fetchPosts = async () => {
   try {
    // Call the appwriteService and ensure the response is typed properly
    const response = await appwriteService.getPosts();

    // Ensure the response is of the correct shape (PostsResponse)
    if (response && response) {
     setPosts(response); // Set the posts correctly
    } else {
     console.error("No posts found or response format is incorrect.");
    }
   } catch (error) {
    console.error("Failed to fetch posts:", error);
   }
  };

  fetchPosts(); // Call the function to fetch posts
 }, []);

 return (
  <div className="w-full py-8">
   <Container>
    <div className="flex flex-wrap">
     {posts.length === 0 ? (
      <p>No posts available.</p> // Handle the case where there are no posts
     ) : (
      posts.map((post) => (
       <div key={post.$id} className="p-2 w-1/4">
        <PostCard {...post} /> {/* Spread the post properties into PostCard */}
       </div>
      ))
     )}
    </div>
   </Container>
  </div>
 );
}

export default AllPosts;
