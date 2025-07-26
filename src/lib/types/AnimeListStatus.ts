import { Anime } from "./anime";

export type AnimeListStatus = Anime & {
    status: "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch";
    score: number;
    num_watched_episodes: number;
    is_rewatching: boolean;
    updated_at: string;
}