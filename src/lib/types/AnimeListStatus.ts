
import { Anime } from "./anime";

export type AnimeListStatus = Anime & {
    list_status: {
        status: "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch";
        score: number;
        num_episodes_watched: number;
        is_rewatching: boolean;
        updated_at: string;
    }
};
