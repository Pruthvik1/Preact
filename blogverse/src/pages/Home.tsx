import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/auth/config";

interface Post {
 $id: string;
 title: string;
 content: string;
 featuredimg: string;
}

function Home() {
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

 if (posts.length === 0) {
  return (
   <div className="w-full py-8 mt-4 text-center">
    <Container>
     <div className="flex flex-wrap">
      <div className="p-2 w-full">
       <h1 className="text-2xl font-bold hover:text-gray-500">Login to read posts</h1>
      </div>
     </div>
    </Container>
   </div>
  );
 }

 return (
  <div className="w-full py-8">
   <Container>
    <div className="flex flex-wrap">
     {posts.map((post) => (
      <div key={post.$id} className="p-2 w-1/4">
       {/* Spread the post properties into PostCard */}
       <PostCard {...post} />
      </div>
     ))}
    </div>
   </Container>
  </div>
 );
}

export default Home;
