import React, { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Box, CircularProgress, Stack, useTheme } from "@mui/material";

interface SearchBarResultsProps {
    query: string;
    searchLoading: boolean;
    searchError: string | null;
    searchResults: Array<{ node: { id: string | number; title: string; main_picture: { large: string; medium: string } } }>;
    onCloseResults: () => void;
}


export const SearchBarResults: React.FC<SearchBarResultsProps> = ({ query, searchLoading, searchError, searchResults, onCloseResults }) => {
    const theme = useTheme();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const closeKeys = ['Escape', 'Tab', 'Enter', 'Esc']

            if (closeKeys.includes(event.key)) {
                setIsVisible(false);
                onCloseResults();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onCloseResults]);

    useEffect(() => {
        setIsVisible(true);
    }, [query]);

    if (!isVisible || !query) return null;

    return (
        <Box className='search-results-container' sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            zIndex: theme.zIndex.appBar + 1,
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[3],
            mt: 0.3,
        }}>
            {query && (

                <Box className="search-results-dropdown"
                    sx={{
                        position: 'absolute',
                        top: '100%',
                        width: '100%',
                        left: 0,
                        right: 0,
                        maxWidth: '260px',
                        maxHeight: '260px',
                        overflowY: 'auto',
                        bgcolor: '#171717',
                        border: '1px solid #eee',
                        borderTop: 'none',
                        boxShadow: ' 0 2px 5px rgba(0, 0, 0, 0.1)',
                        zIndex: 1000,
                        p: 1,
                        boxSizing: 'border-box',
                        borderRadius: theme.shape.borderRadius
                    }}
                >
                    {searchLoading ? (
                        <Box sx={{ p: 2, textAlign: 'center' }}>Searching...
                            <CircularProgress size={20} color="inherit" sx={{ marginLeft: 1 }} />
                        </Box>
                    ) : searchError ? (
                        <Box sx={{ p: 2, color: 'error.main' }}>Error: {searchError}</Box>
                    ) : searchResults.length === 0 ? (
                        <Box sx={{ p: 2, textAlign: 'center' }}>No results found</Box>
                    ) : (
                        <List dense sx={{ borderRadius: theme.shape.borderRadius }}>
                            {searchResults.map((anime) => (
                                <ListItemButton key={anime.node.id} href={`/anime/${anime.node.id}`} sx={{ all: 'inherit' }}>
                                    <ListItem disablePadding>
                                        <ListItemAvatar>
                                            <Avatar alt={anime.node.title} src={anime.node.main_picture.large} />
                                        </ListItemAvatar>
                                        <ListItemText primary={anime.node.title} />
                                    </ListItem>
                                </ListItemButton>
                            ))}
                        </List>
                    )}
                </Box>
            )
            }
        </Box >
    )
}
