//        const res = await axios.get(`${MAL_API_URL}/anime/${id}?fields=id,title,main_picture,start_date,end_date,status,num_episodes`, {

interface Genre {
    id: number;
    name: string;
}

interface AlternativeTitles {
    synonyms: string[];
    en?: string;
    ja?: string;
}

export interface AnimeDetails {
    id: number;
    title: string;
    mean: number;
    alternative_titles: AlternativeTitles;
    main_picture: {
        large: string;
        medium: string;
    }
    start_date: string;
    end_date: string;
    status: string;
    genres: Genre[];
    num_episodes: number;
    synopsis: string;
}