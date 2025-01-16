export interface TrackType {
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

export interface RecentlyPlayedType {
    items: {
        played_at: string;
        context: {
            external_urls: {
                spotify: string;
            };
            href: string;
            type: string;
            uri: string;
        },
        track: {
            id: string;
            href: string;
            name: string;
            duration_ms: number;
            artists: {
                id: string;
                name: string;
                type: string;
                uri: string;
                href: string;
            }[];
            album: {
                images: {
                    url: string;
                    height: number;
                    width: number;
                }[];
            }
        }
    }[];
}