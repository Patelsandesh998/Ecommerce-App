import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth(); // No need for setAuth, as we're only reading auth data

  useEffect(() => {
    const authCheck = async () => {
      try {
        if (!auth?.token) {
          setOk(false);
          return;
        }

        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/admin-auth`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );

        setOk(data.ok);
      } catch (error) {
        console.error("Admin authentication error:", error);
        setOk(false);
      }
    };

    authCheck();
  }, [auth?.token]);

  // Redirect to login if not authenticated
  if (!auth?.token) return <Navigate to="/login" />;

  return ok ? <Outlet /> : <Navigate to="/" />;
}
