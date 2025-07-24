import { UserProfile } from "./UserProfile";
export type AuthContextType = {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
    setUser: (user: UserProfile | null) => void;
};
