import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

interface ProtectedProps {
 children: React.ReactNode;
 authentication?: boolean;
}

export default function Protected({ children, authentication = true }: ProtectedProps) {
 const navigate = useNavigate();
 const [loader, setLoader] = useState<boolean>(true);
 const authStatus = useSelector((state: RootState) => state.auth.status);

 useEffect(() => {
  // Check the authentication status and redirect accordingly
  if (authentication && authStatus !== authentication) {
   navigate("/login");
  } else if (!authentication && authStatus !== authentication) {
   navigate("/");
  }

  setLoader(false); // Once the effect runs, set loader to false
 }, [authStatus, navigate, authentication]);

 return loader ? <h1>Loading...</h1> : <>{children}</>;
}
