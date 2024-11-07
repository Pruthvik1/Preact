import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/auth/config";
interface Post {
 $id: string;
 title: string;
 content: string;
 featuredimg: string;
}

function AllPosts() {
 const [posts, setPosts] = useState<Post[]>([]);

 useEffect(() => {
  const fetchPosts = async () => {
   try {
    const response = await appwriteService.getPosts();

    if (response && Array.isArray(response)) {
     // Map the PostDocument to Post format if necessary
     const mappedPosts: Post[] = response.map((postDoc) => ({
      $id: postDoc.id,
      title: postDoc.title,
      content: postDoc.content,
      featuredimg: postDoc.featuredimg,
     }));
     setPosts(mappedPosts);
    } else {
     console.error("No posts found or response format is incorrect.");
    }
   } catch (error) {
    console.error("Failed to fetch posts:", error);
   }
  };

  fetchPosts();
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
