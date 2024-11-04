import { useState } from "react";
import IconComplete from "../assets/svg/IconComplete";
import IconRemove from "../assets/svg/IconRemove";
import IconUpdate from "../assets/svg/IconUpdate";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleComplete, updateTodo } from "../fetatures/todoSlice";

interface FormItemProps {
 text: string;
 completed: boolean;
 id: string;
}

export default function FormItem({ text, completed, id }: FormItemProps) {
 const [isUpdating, setIsUpdating] = useState(false);
 const [value, setValue] = useState(text);
 const dispatch = useDispatch();

 const handleComplete = () => {
  dispatch(toggleComplete(id));
 };

 const handleRemove = () => {
  dispatch(deleteTodo(id));
 };

 const handleUpdate = () => {
  if (isUpdating) {
   dispatch(updateTodo({ id, value }));
  }
  setIsUpdating(!isUpdating);
 };

 return (
  <li className="border-b py-4 flex justify-between gap-4 items-center">
   {isUpdating ? (
    <form
     className="flex flex-auto"
     onSubmit={(e) => {
      e.preventDefault();
      handleUpdate();
     }}
    >
     <input type="text" className="flex text-2xl max-md:text-xl font-normal text-gray-800 border" value={value} onChange={(e) => setValue(e.target.value)} />
    </form>
   ) : (
    <span className={`text-2xl max-md:text-xl font-normal text-gray-800 ${completed ? "line-through" : ""}`}>{value}</span>
   )}
   <div className="flex justify-center gap-4 items-center">
    <button className="p-4 cursor-pointer border rounded-full hover:border-gray-800 transition" onClick={handleComplete}>
     <IconComplete />
    </button>
    <button className="p-4 cursor-pointer border rounded-full hover:border-gray-800 transition" onClick={handleUpdate}>
     <IconUpdate />
    </button>
    <button className="p-4 cursor-pointer border rounded-full hover:border-gray-800 transition" onClick={handleRemove}>
     <IconRemove />
    </button>
   </div>
  </li>
 );
}
