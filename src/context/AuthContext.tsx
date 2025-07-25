"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { getUserDetails } from "@/lib/auth/mal";
import { UserProfile } from "@/lib/types/UserProfile";
import { AuthContextType } from "@/lib/types/AuthContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getUserDetails()
            .then((data) => {
                if (data && !data.error) {
                    setUser(data);
                } else {
                    setError(data?.error || "User not found");
                }
            })
            .catch((err) => {
                console.error(err);
                setError("An error occurred while fetching user details");
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    return (
        <AuthContext
            value={{ user, loading, error, setUser }
            }>
            {children}
        </AuthContext>

    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
