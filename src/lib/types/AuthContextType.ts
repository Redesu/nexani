import { UserProfile } from "./UserProfile";
export type AuthContextType = {
    user: UserProfile | null;
    loadingContext: boolean;
    error: string | null;
    setUser: (user: UserProfile | null) => void;
};
