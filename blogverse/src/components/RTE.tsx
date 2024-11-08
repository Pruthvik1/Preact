import { Editor } from "@tinymce/tinymce-react";
import { Controller, Control } from "react-hook-form";

interface RTEProps {
 name: string;
 control: Control<any>;
 label?: string;
 defaultValue?: string;
}

export default function RTE({ name, control, label, defaultValue = "" }: RTEProps) {
 return (
  <div className="w-full">
   {label && <label className="inline-block mb-1 pl-1">{label}</label>}

   <Controller
    name={name || "content"}
    control={control}
    render={({ field: { onChange, value } }) => (
     <Editor
      apiKey="3gn0gx4bcdccc67ykj316qaiuo73hwnubf1eahyzovk4gk4n"
      value={value || defaultValue}
      init={{
       height: 500,
       menubar: true,
       plugins: ["image", "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount", "anchor"],
       toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
       content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      onEditorChange={onChange}
     />
    )}
   />
  </div>
 );
}
