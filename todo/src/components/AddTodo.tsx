import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

export default function AddTodo() {
 const { addTodo } = useContext(TodoContext);
 const handleSubmit = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  addTodo(val);
  setVal("");
 };
 const [val, setVal] = useState<string>("");
 return (
  <form className="js-todo-form w-full flex justify-between my-8" onSubmit={handleSubmit}>
   <input className="js-todo-input grow border border-gray-300 px-4 py-4 rounded-md" onChange={(e) => setVal(e.target.value)} value={val} placeholder="Add a new task" type="text" aria-label="Add a new task" />
   <button className="js-todo-add-button bg-black text-white px-4 py-2 rounded-md ml-2" type="submit" aria-label="Add task">
    Add task
   </button>
  </form>
 );
}
