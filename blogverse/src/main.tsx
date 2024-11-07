import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "./store/store.js";
import AuthLayout from "./components/AuthLayout.js";
import Login from "./components/Login.js";
import AddPost from "./pages/AddPost.js";
import AllPosts from "./pages/AllPost.js";
import EditPost from "./pages/EditPost.js";
import Home from "./pages/Home.js";
import Post from "./pages/Post.js";
import Signup from "./pages/SignUp.js";

const router = createBrowserRouter([
 {
  path: "/",
  element: <App />,
  children: [
   {
    path: "/",
    element: <Home />,
   },
   {
    path: "/login",
    element: (
     <AuthLayout authentication={false}>
      <Login />
     </AuthLayout>
    ),
   },
   {
    path: "/signup",
    element: (
     <AuthLayout authentication={false}>
      <Signup />
     </AuthLayout>
    ),
   },
   {
    path: "/all-posts",
    element: (
     <AuthLayout authentication>
      {" "}
      <AllPosts />
     </AuthLayout>
    ),
   },
   {
    path: "/add-post",
    element: (
     <AuthLayout authentication>
      {" "}
      <AddPost />
     </AuthLayout>
    ),
   },
   {
    path: "/edit-post/:slug",
    element: (
     <AuthLayout authentication>
      {" "}
      <EditPost />
     </AuthLayout>
    ),
   },
   {
    path: "/post/:slug",
    element: <Post />,
   },
  ],
 },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
 <React.StrictMode>
  <Provider store={store}>
   <RouterProvider router={router} />
  </Provider>
 </React.StrictMode>
);
