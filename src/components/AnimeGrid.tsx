import { Anime } from "@/lib/types/anime";
import AnimeCard from "./AnimeCard";
import { Grid, Box, Container, IconButton } from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { useRef, useState, useEffect } from "react";


interface AnimeGridProps {
    animes: Anime[];
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ animes }) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const checkScrollPosition = () => {
        if (gridRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
            // Show left arrow if not at start
            setShowLeftArrow(scrollLeft > 0);
            // Show right arrow if not at end
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        const grid = gridRef.current;
        if (grid) {
            // Use setTimeout to ensure DOM is fully rendered
            const timer = setTimeout(() => {
                checkScrollPosition();
            }, 100);

            grid.addEventListener('scroll', checkScrollPosition);
            return () => {
                clearTimeout(timer);
                grid.removeEventListener('scroll', checkScrollPosition);
            };
        }
    }, [animes]);

    const scrollRight = () => {
        if (gridRef.current) {
            gridRef.current.scrollBy({
                left: 900,
                behavior: 'smooth'
            });
            setTimeout(checkScrollPosition, 100);
        }
    };

    const scrollLeft = () => {
        if (gridRef.current) {
            gridRef.current.scrollBy({
                left: -900,
                behavior: 'smooth'
            })
            setTimeout(checkScrollPosition, 100);
        }
    };
    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '100vw',
            overflow: 'hidden'
        }}>
            {showLeftArrow && (
                <IconButton
                    onClick={scrollLeft}
                    sx={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        '&:hover': {
                            bgcolor: 'action.hover',
                        },
                        display: { xs: 'none', sm: 'flex' }
                    }}
                >
                    <ChevronLeft />
                </IconButton>
            )}

            <Box
                ref={gridRef}
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    px: 0.5,
                    py: 2,
                    scrollBehavior: 'smooth'
                }}
            >
                {animes.map((anime) => (
                    <Box key={anime.node.id} sx={{
                        minWidth: 235,
                        flexShrink: 0,
                    }}>
                        <AnimeCard anime={anime} />
                    </Box>
                ))}
            </Box>
            {showRightArrow && (
                <IconButton
                    onClick={scrollRight}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        '&:hover': {
                            bgcolor: 'action.hover',
                        },
                        display: { xs: 'none', sm: 'flex' }
                    }}
                >
                    <ChevronRight />
                </IconButton>
            )}
        </Box>
    )
}

export default AnimeGrid;