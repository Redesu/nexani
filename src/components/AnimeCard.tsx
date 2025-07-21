import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Anime } from "@/lib/types/anime";
import { Box, useTheme } from '@mui/material';

interface AnimeCardProps {
    anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
    const theme = useTheme();
    return (
        <Card sx={{
            width: 225,
            height: 305,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: theme.shape.borderRadius,
            '& .MuiCardMedia-img': {
                transformOrigin: 'top center'
            }
        }} className='card-container' >
            <CardActionArea href={`/anime/${anime.node.id}`}>
                <Box sx={{
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '250px'
                }}>
                    <CardMedia
                        component="img"
                        image={anime.node.main_picture.large}
                        alt={anime.node.title}
                        sx={{
                            transition: 'transform 0.3s ease',
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </Box>
                <CardContent className='card-content' sx={{ bgcolor: '#171717', flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        lineHeight: 1.2,
                        maxHeight: '3.6em', // 1.2 * 3 = 3.6em (3 lines)
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                    }} title={anime.node.title}>
                        {anime.node.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card >
    )
}

export default AnimeCard;
