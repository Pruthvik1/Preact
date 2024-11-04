import { useContext } from "react";
import AddTodo from "./components/AddTodo";
import { TodoContext } from "./context/TodoContext";
import FormItem from "./components/FormItem";

function App() {
 const { todos } = useContext(TodoContext);
 return (
  <div className="container mx-auto flex justify-center items-center p-4">
   <div className="w-10/12 max-md:w-full">
    <AddTodo />
    <ul className="js-todo-list" role="list">
     {todos.map((todo) => (
      <FormItem key={todo.id} text={todo.todo} completed={todo.completed} id={todo.id} />
     ))}
    </ul>
   </div>
  </div>
 );
}

export default App;
