import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useSearchAnime } from '@/hooks/useSearchAnime';
import { useState } from 'react';
import { Box } from '@mui/material';
import { ClassNames } from '@emotion/react';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function SearchBar() {

    const [query, setQuery] = useState('');
    const { searchResults, loading: searchLoading, error: searchError } = useSearchAnime(query, 700);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setQuery(event.target.value);
    };

    return (
        <Box className='search-bar-container'>
            <Search className='search-bar-container'>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearchChange}
                    value={query}
                />
            </Search>
            {searchLoading && <div className='search-status'>Searching...</div>}
            {searchError && <p className='search-error' style={{ color: 'red' }}>Error: {searchError}</p>}
            {
                query.trim() && !searchLoading && searchResults.length > 0 && (
                    <div className='search-results-dropdown'>
                        <ul>
                            {searchResults.map((anime) => (
                                <li key={anime.node.id}>{anime.node.title}</li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </Box>
    )
}