import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
 todos: [{ id: "1", text: "first todo", completed: false }],
};

export const todoSlice = createSlice({
 name: "todo-redux",
 initialState,
 reducers: {
  addTodo: (state, action) => {
   state.todos.push({
    id: nanoid(),
    text: action.payload,
    completed: false,
   });
  },
  deleteTodo: (state, action) => {
   state.todos = state.todos.filter((todo) => todo.id !== action.payload);
  },
  updateTodo: (state, action) => {
   const { id, value } = action.payload;
   const todo = state.todos.find((todo) => todo.id === id);
   if (todo) {
    todo.text = value;
   }
  },
  toggleComplete: (state, action) => {
   const id = action.payload;
   const todo = state.todos.find((todo) => todo.id === id);
   if (todo) {
    todo.completed = !todo.completed;
   }
  },
 },
});

export const { addTodo, deleteTodo, updateTodo, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;
