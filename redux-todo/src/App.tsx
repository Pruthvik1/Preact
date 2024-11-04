import AddTodo from "./components/AddTodo";
import FormItem from "./components/FormItem";
import { useSelector } from "react-redux";

function App() {
 const todos = useSelector((state) => state.todos);
 return (
  <div className="container mx-auto flex justify-center items-center p-4">
   <div className="w-10/12 max-md:w-full">
    <AddTodo />
    <ul className="js-todo-list" role="list">
     {todos.map((todo: { id: string; text: string; completed: boolean }) => (
      <FormItem key={todo.id} text={todo.text} completed={todo.completed} id={todo.id} />
     ))}
    </ul>
   </div>
  </div>
 );
}

export default App;
