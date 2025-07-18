import { Anime } from "@/lib/types/anime";
import { Grid, Alert, Container, Button } from "@mui/material";
import AnimeCard from "./AnimeCard";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { useState, useCallback, useEffect } from "react";

interface AnimeGridProps {
    animes: Anime[];
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ animes }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            slidesToScroll: 1,
            skipSnaps: false
        },
        [AutoPlay({ delay: 3000 })]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);


    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi, setSelectedIndex])


    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);

        };
    }, [emblaApi, onSelect]);

    if (!animes || animes.length === 0) {
        return <Alert severity="error">Could not fetch seasonal anime</Alert>;
    }

    return (
        <Container className="embla" ref={emblaRef}>

            <div className="embla__container">
                {animes.map((anime) => (
                    <Grid key={anime.node.id} className="embla__slide">
                        <AnimeCard anime={anime} />
                    </Grid>
                ))}
            </div>

            <Grid container className="embla__dots">
                {scrollSnaps.map((_, index) => (
                    <Grid key={index} className="embla__dot-container">
                        <Button
                            className={`embla__dot ${index === selectedIndex ? "is-selected" : ""}`}
                            variant="contained"
                            onClick={() => scrollTo(index)}
                            sx={{
                                bgcolor: 'grey.500',
                                '&:hover': {
                                    bgcolor: 'grey.700',
                                },
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default AnimeGrid;