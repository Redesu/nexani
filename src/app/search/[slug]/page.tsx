'use client'

import { useParams } from "next/navigation";
import { useSearchAnime } from "@/hooks/useSearchAnime";
import { useState } from "react";

export default function Search() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug || '';
    const [searchQuery, setSearchQuery] = useState(slug);
    const { searchResults, loading: searchLoading, error: searchError } = useSearchAnime(slug, 700);
    const decodedQuery = decodeURIComponent(searchQuery);

    return <h1>Search for "{decodedQuery}"</h1>
}