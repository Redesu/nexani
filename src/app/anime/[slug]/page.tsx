'use client';

import { useParams } from "next/navigation";

export default function animeDetailsPage() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug || '';
}