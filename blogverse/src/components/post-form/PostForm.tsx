import React, { useCallback } from "react";
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
 status: string;
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
   title: post?.title || "",
   slug: post?.$id || "",
   content: post?.content || "",
   status: post?.status || "active",
  },
 });

 const navigate = useNavigate();
 const userData = useSelector((state: RootState) => state.auth.userData); // RootState is the root reducer type

 const submit: SubmitHandler<FormData> = async (data) => {
  if (post) {
   const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

   if (file) {
    appwriteService.deleteFile(post.featuredimg!); // Non-null assertion as featuredimg should be there
   }

   const dbPost = await appwriteService.updatePost(post.$id, {
    ...data,
    featuredimg: file ? file.$id : undefined,
   });

   if (dbPost) {
    navigate(`/post/${dbPost.$id}`);
   }
  } else {
   const file = await appwriteService.uploadFile(data.image?.[0]);

   if (file) {
    const fileId = file.$id;
    data.featuredimg = fileId;
    const dbPost = await appwriteService.createPost({ ...data, userid: userData.$id });

    if (dbPost) {
     navigate(`/post/${dbPost.$id}`);
    }
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

 React.useEffect(() => {
  const subscription = watch((value, { name }) => {
   if (name === "title") {
    setValue("slug", slugTransform(value.title), { shouldValidate: true });
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
