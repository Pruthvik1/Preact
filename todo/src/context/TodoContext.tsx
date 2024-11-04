import React, { createContext, useEffect, useState } from "react";

export const TodoContext = createContext<{
 todos: Array<{ todo: string; id: string; completed: boolean }>;
 addTodo: (todo: string) => void;
 updateTodo: (id: string, todo: string) => void;
 deleteTodo: (id: string) => void;
 toggleComplete: (id: string) => void;
}>({
 todos: [],
 addTodo: () => {},
 updateTodo: () => {},
 deleteTodo: () => {},
 toggleComplete: () => {},
});

export default function TodoContextProvider({ children }: { children: React.ReactNode }) {
 const [todos, setTodos] = useState<Array<{ todo: string; id: string; completed: boolean }>>(() => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
   return JSON.parse(storedTodos);
  }
  return [
   { id: Date.now().toString(), todo: "first todo", completed: false },
   { id: (Date.now() + 1).toString(), todo: "second todo", completed: false },
   { id: (Date.now() + 2).toString(), todo: "third todo", completed: true },
  ];
 });

 useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
 }, [todos]);

 const addTodo = (todo: string) => {
  const newTodo = { id: Date.now().toString(), todo, completed: false };
  setTodos((prev) => [newTodo, ...prev]);
 };

 const updateTodo = (id: string, updatedTodo: string) => {
  setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, todo: updatedTodo } : todo)));
 };

 const deleteTodo = (id: string) => {
  setTodos((prev) => prev.filter((todo) => todo.id !== id));
 };

 const toggleComplete = (id: string) => {
  setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
 };

 return <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>{children}</TodoContext.Provider>;
}
