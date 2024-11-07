import { useEffect, useState } from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { authService } from "./appwrite/auth/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { config } from "./config/config";

function App() {
 const [loading, setLoading] = useState(true);
 const dispatch = useDispatch();
 useEffect(() => {
  authService
   .getCurrentUser()
   .then((userData) => {
    if (userData) {
     dispatch(login({ userData }));
    } else {
     dispatch(logout());
    }
   })
   .finally(() => setLoading(false));
 }, []);
 return loading ? null : (
  <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
   <div className="w-full block">
    <Header />
    <Outlet />
    <Footer />
   </div>
  </div>
 );
}

export default App;
