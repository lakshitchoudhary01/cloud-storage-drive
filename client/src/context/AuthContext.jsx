import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const currentUser = await getCurrentUser();

                setUser(currentUser);

            } catch (error) {

                console.log(error);

                localStorage.removeItem("token");

            } finally {

                setLoading(false);

            }
        };

        loadUser();

    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);