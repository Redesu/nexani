interface AnimeStatistics {
    num_items_watching: number;
    num_items_completed: number;
    num_items_on_hold: number;
    num_items_dropped: number;
    num_items_plan_to_watch: number;
    num_items: number;
    num_days_watched: number;
    num_days_watching: number;
    num_days_completed: number;
    num_days_on_hold: number;
    num_days_dropped: number;
    num_days: number;
    num_episodes: number;
    num_times_rewatched: number;
    mean_score: number;
}
export interface UserProfile {
    id: number;
    name: string;
    picture: string;
    gender: string | null;
    birthday: string | null;
    location: string | null;
    joined_at: string;
    anime_statistics: AnimeStatistics | null;
    time_zone: string | null;
    is_supporter: boolean | null;
}