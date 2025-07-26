export type Anime = {
    node: {
        id: number,
        title: string,
        num_episodes: number,
        main_picture: {
            large: string,
            medium: string
        }
    }
}