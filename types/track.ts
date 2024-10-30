export type TrackType = {
    href: string;
    limit: number;
    next: string;
    offset: number;
    items: {
        id: string;
        href: string;
        name: string;
        album: {
            album_type: string;
            artists: {
                id: number;
                name: string;
                type: string;
                href: string;
                uri: string;
            }[];
            href: string;
            id: string;
            images: {
                url: string;
            }[];
            name: string;
            type: string;
            uri: string;
        }
    }[];
};