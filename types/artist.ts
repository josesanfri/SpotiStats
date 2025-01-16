export interface ArtistType {
    href: string;
    limit: number;
    next: string;
    offset: number;
    items: {
        id: string;
        href: string;
        name: string;
        type: string;
        uri: string;
        popularity: number;
        genres: string[];
        images: {
            url: string;
            height: number;
            width: number;
        }[];
        external_urls: {
            spotify: string;
        };
    }[];
};