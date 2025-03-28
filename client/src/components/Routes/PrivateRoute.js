import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth(); // No need for setAuth

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/user-auth`,
          {
            headers: { Authorization: `Bearer ${auth?.token}` },
          }
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("User authentication failed:", error);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  if (!auth?.token) {
    return <Navigate to="/login" />;
  }

  return ok ? <Outlet /> : <Spinner />;
}
