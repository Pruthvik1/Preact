import { config } from "../../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

// Define types for parameters
interface CreatePostParams {
 title: string;
 slug: string;
 content: string;
 featuredimg: string;
 status: string;
 userid: string;
}

interface UpdatePostParams {
 title: string;
 content: string;
 featuredimg: string;
 status: string;
}

interface PostDocument {
 title: string;
 slug: string;
 content: string;
 featuredimg: string;
 status: string;
 userid: string;
 [key: string]: any; // Allow extra fields
}

class Service {
 client: Client;
 databases: Databases;
 bucket: Storage;

 constructor() {
  this.client = new Client().setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
  this.databases = new Databases(this.client);
  this.bucket = new Storage(this.client);
 }

 // Create post method
 async createPost({ title, slug, content, featuredimg, status, userid }: CreatePostParams): Promise<PostDocument | false> {
  try {
   const result = await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, {
    title,
    content,
    featuredimg,
    status,
    userid,
   });
   return result as any;
  } catch (error) {
   console.error("Appwrite service :: createPost :: error", error);
   return false;
  }
 }

 // Update post method
 async updatePost(slug: string, { title, content, featuredimg, status }: UpdatePostParams): Promise<PostDocument | false> {
  try {
   const result = await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, {
    title,
    content,
    featuredimg,
    status,
   });
   return result as any;
  } catch (error) {
   console.error("Appwrite service :: updatePost :: error", error);
   return false;
  }
 }

 // Delete post method
 async deletePost(slug: string): Promise<boolean> {
  try {
   await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
   return true;
  } catch (error) {
   console.error("Appwrite service :: deletePost :: error", error);
   return false;
  }
 }

 // Get a single post by slug
 async getPost(slug: string): Promise<PostDocument | false> {
  try {
   const result = await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
   return result as any;
  } catch (error) {
   console.error("Appwrite service :: getPost :: error", error);
   return false;
  }
 }

 // Get posts based on queries
 async getPosts(queries: any = [Query.equal("status", "active")]): Promise<PostDocument[] | false> {
  try {
   const result = await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId, queries);
   return result.documents as any;
  } catch (error) {
   console.error("Appwrite service :: getPosts :: error", error);
   return false;
  }
 }

 // File upload method (using native browser File type)
 async uploadFile(file: File): Promise<any> {
  try {
   const result = await this.bucket.createFile(config.appwriteBucketId, ID.unique(), file);
   return result as any;
  } catch (error) {
   console.error("Appwrite service :: uploadFile :: error", error);
   return false;
  }
 }

 // Delete file method
 async deleteFile(fileId: string): Promise<boolean> {
  try {
   await this.bucket.deleteFile(config.appwriteBucketId, fileId);
   return true;
  } catch (error) {
   console.error("Appwrite service :: deleteFile :: error", error);
   return false;
  }
 }

 // Get file preview method
 getFilePreview(fileId: string): any {
  return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
 }
}

const appwriteService = new Service();
export default appwriteService;
