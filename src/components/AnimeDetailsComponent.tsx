import { AnimeDetails } from "@/lib/types/animeDetails";
interface AnimeDetailsProps{
    animeDetails: AnimeDetails;
}

const AnimeDetailsComponent: React.FC<AnimeDetailsProps> = ({ animeDetails }) => {
    return (
        <div>
            <h2>{animeDetails.title}</h2>
            <img src={animeDetails.main_picture.large} alt={animeDetails.title} />
            <p>Start Date: {animeDetails.start_date}</p>
            <p>End Date: {animeDetails.end_date}</p>
            <p>Status: {animeDetails.status}</p>
            <p>Number of Episodes: {animeDetails.num_episodes}</p>
            <p>Synopsis: {animeDetails.synopsis}</p>
        </div>
    );
}

export default AnimeDetailsComponent;