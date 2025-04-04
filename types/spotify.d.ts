export interface SpotifyUser {
    id: string;
    country: string;
    display_name: string;
    email: string;
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    href: string;
    product: string;
    type: string;
    uri: string;
    images: {
        height: number;
        url: string;
        width: number;
    }[];
}

export interface Artist {
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
        followers: {
            total: number;
        };
        external_urls: {
            spotify: string;
        };
    }[];
}

export interface Track {
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
        };
    }[];
}

export interface TrackHistory {
    href: string;
    limit: number;
    next: string;
    cursors: {
        after: string;
        before: string;
    };
    total: number;
    items: {
        track: {
            album: {
                album_type: "compilation";
                total_tracks: number;
                available_markets: string[];
                external_urls: {
                    spotify: string;
                };
                href: string;
                id: string;
                images: {
                    url: string;
                    height: number;
                    width: number;
                }[];
                name: string;
                release_date: string;
                release_date_precision: "year" | "month" | "day";
                restrictions: {
                    reason: "market";
                };
                type: "album";
                uri: string;
                artists: {
                    external_urls: {
                        spotify: string;
                    };
                    href: string;
                    id: string;
                    name: string;
                    type: "artist";
                    uri: string;
                }[];
            };
            artists: {
                external_urls: {
                    spotify: string;
                };
                href: string;
                id: string;
                name: string;
                type: "artist";
                uri: string;
            }[];
            available_markets: string[];
            disc_number: number;
            duration_ms: number;
            explicit: boolean;
            external_ids: {
                isrc: string;
                ean: string;
                upc: string;
            };
            external_urls: {
                spotify: string;
            };
            href: string;
            id: string;
            is_playable: boolean;
            linked_from: object;
            restrictions: {
                reason: string;
            };
            name: string;
            popularity: number;
            preview_url: string;
            track_number: number;
            type: "track";
            uri: string;
            is_local: boolean;
        };
        played_at: string;
        context: {
            type: string;
            href: string;
            external_urls: {
                spotify: string;
            };
            uri: string;
        };
    }[];
}

export interface Genre {
    genre: string;
    count: number;
}
