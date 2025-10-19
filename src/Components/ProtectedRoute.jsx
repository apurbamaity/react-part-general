import { useContext, useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

// import { AuthContext } from "./AuthProvider";

import axios from "axios";

export default function ProtectedRoute({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const tokenHeader = "my-secret-token"

    useEffect(() => {
        console.log("useEffect called with token:", token);

        const verifyToken = async () => {

            try {

                const res = await axios.get("http://localhost:8000/protected", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(res)
                console.log("the endpoint is verified")

                setIsAuthenticated(true);

            } catch (err) {

                localStorage.removeItem("token");

                setIsAuthenticated(false);
                console.log("some eror occured")

            } finally {

                setLoading(false);

            }

        };

        verifyToken();

    }, [tokenHeader]);

    if (loading) return <div>Loading...</div>; // show spinner or placeholder

    // return isAuthenticated ? children : <Navigate to='/' />;
    return isAuthenticated ? children : <h1 className="text-3xl bg-red-300 px-3 py-2">Not authenticated endpoint</h1>;


}
