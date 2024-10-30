export type SpotifyUserType = {
    id: string;
    country: string;
    display_name: string;
    email: string;
    external_urls: {
        spotify: string;
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
};