//        const res = await axios.get(`${MAL_API_URL}/anime/${id}?fields=id,title,main_picture,start_date,end_date,status,num_episodes`, {


export interface AnimeDetails {
    id: number;
    title: string;
    main_picture: {
        large: string;
        medium: string;
    }
    start_date: string;
    end_date: string;
    status: string;
    num_episodes: number;
}