import { useCallback, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import appwriteService from "../../appwrite/auth/config";

// Define the structure of the post object
interface Post {
 $id: string;
 title: string;
 slug: string;
 content: string;
 status: "active" | "inactive";
 featuredimg?: string;
}

interface PostFormProps {
 post?: Post;
}

interface FormData {
 title: string;
 slug: string;
 content: string;
 status: "active" | "inactive";
 image?: FileList;
}

export default function PostForm({ post }: PostFormProps) {
 const { register, handleSubmit, watch, setValue, control, getValues } = useForm<FormData>({
  defaultValues: {
   title: post?.title || "", // Ensure title is always a string
   slug: post?.slug || "", // Ensure slug is always a string
   content: post?.content || "",
   status: post?.status || "active",
  },
 });

 const navigate = useNavigate();
 const userData = useSelector((state: RootState) => state.auth.userData); // RootState is the root reducer type

 const submit: SubmitHandler<FormData> = async (data) => {
  let file;
  if (data.image?.[0]) {
   file = await appwriteService.uploadFile(data.image[0]);
  }

  if (post) {
   // Handle the case where post already exists
   if (file && post.featuredimg) {
    // Delete the old file if a new one is uploaded
    appwriteService.deleteFile(post.featuredimg);
   }

   const updatedPost = await appwriteService.updatePost(post.$id, {
    ...data,
    featuredimg: file ? file.$id : post.featuredimg, // Keep existing file if no new file is uploaded
   });

   if (updatedPost) {
    navigate(`/post/${updatedPost.$id}`);
   }
  } else {
   // Handle post creation
   const newPost = await appwriteService.createPost({
    ...data,
    featuredimg: file ? file.$id : undefined, // Only include featuredimg if a file was uploaded
    userid: userData.$id,
   });

   if (newPost) {
    navigate(`/post/${newPost.$id}`);
   }
  }
 };

 const slugTransform = useCallback((value: string) => {
  if (value) {
   return value
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z\d\s]+/g, "-")
    .replace(/\s/g, "-");
  }
  return "";
 }, []);

 useEffect(() => {
  const subscription = watch((value, { name }) => {
   if (name === "title") {
    setValue("slug", slugTransform(String(value.title)), { shouldValidate: true });
   }
  });

  return () => subscription.unsubscribe();
 }, [watch, slugTransform, setValue]);

 return (
  <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
   <div className="w-2/3 px-2">
    <Input label="Title :" placeholder="Title" className="mb-4" {...register("title", { required: true })} />
    <Input
     label="Slug :"
     placeholder="Slug"
     className="mb-4"
     {...register("slug", { required: true })}
     onInput={(e) => {
      setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
     }}
    />
    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
   </div>
   <div className="w-1/3 px-2">
    <Input label="Featured Image :" type="file" className="mb-4" accept="image/png, image/jpg, image/jpeg, image/gif" {...register("image", { required: !post })} />
    {post && post.featuredimg && (
     <div className="w-full mb-4">
      <img src={appwriteService.getFilePreview(post.featuredimg)} alt={post.title} className="rounded-lg" />
     </div>
    )}
    <Select options={["active", "inactive"]} label="Status" className="mb-4" {...register("status", { required: true })} />
    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
     {post ? "Update" : "Submit"}
    </Button>
   </div>
  </form>
 );
}
