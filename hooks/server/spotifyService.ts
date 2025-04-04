"use server";

import axios from "axios";
import { SpotifyUser, Artist, Track, TrackHistory } from "@/types/spotify";

const SPOTIFY_ENDPOINT = "https://api.spotify.com/v1";

/**
 * Fetches the Spotify user profile.
 * 
 * @param token - The access token for Spotify API authentication.
 * @returns A promise that resolves to the Spotify user's profile data.
 * @throws An error if the request fails.
 */
export const getUser = async (token: string): Promise<SpotifyUser> => {
    try {
        const { data } = await axios.get(`${SPOTIFY_ENDPOINT}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data as SpotifyUser;
    } catch (error) {
        throw new Error("Error getting user profile: " + error);
    }
};

/**
 * Fetches the user's top artists from Spotify.
 * 
 * @param token - The access token for Spotify API authentication.
 * @param timeRange - The time range for the top artists (short_term, medium_term, or long_term).
 * @returns A promise that resolves to the user's top artists data.
 * @throws An error if the request fails.
 */
export const getUserTopArtists = async (
    token: string,
    timeRange: "short_term" | "medium_term" | "long_term" = "short_term"
): Promise<Artist> => {
    try {
        const { data } = await axios.get(`${SPOTIFY_ENDPOINT}/me/top/artists`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                time_range: timeRange,
                limit: 20,
                offset: 0,
            },
        });

        return data as Artist;
    } catch (error) {
        throw new Error("Error getting user top artists: " + error);
    }
};

/**
 * Fetches the user's top tracks from Spotify.
 * 
 * @param token - The access token for Spotify API authentication.
 * @param timeRange - The time range for the top tracks (short_term, medium_term, or long_term).
 * @returns A promise that resolves to the user's top tracks data.
 * @throws An error if the request fails.
 */
export const getUserTopTracks = async (
    token: string,
    timeRange: "short_term" | "medium_term" | "long_term" = "short_term"
): Promise<Track> => {
    try {
        const { data } = await axios.get(`${SPOTIFY_ENDPOINT}/me/top/tracks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                time_range: timeRange,
                limit: 20,
                offset: 0,
            },
        });

        return data as Track;
    } catch (error) {
        throw new Error("Error getting user top tracks: " + error);
    }
};

/**
 * Fetches the user's top tracks from Spotify for a long-term time range.
 * 
 * @param token - The access token for Spotify API authentication.
 * @param timeRange - The time range for the top tracks (default is long_term).
 * @returns A promise that resolves to the user's top tracks data.
 * @throws An error if the request fails.
 */
export const getUserTopTracksLong = async (
    token: string,
    timeRange: "short_term" | "medium_term" | "long_term" = "long_term"
): Promise<Track> => {
    try {
        const { data } = await axios.get(`${SPOTIFY_ENDPOINT}/me/top/tracks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                time_range: timeRange,
                limit: 20,
                offset: 0,
            },
        });

        return data as Track;
    } catch (error) {
        throw new Error("Error getting user top tracks: " + error);
    }
};

/**
 * Fetches the user's recently played tracks from Spotify.
 * 
 * @param token - The access token for Spotify API authentication.
 * @returns A promise that resolves to the user's recently played tracks data.
 * @throws An error if the request fails.
 */
export const getUserRecentlyPlayed = async (
    token: string
): Promise<TrackHistory> => {
    try {
        const { data } = await axios.get(
            `${SPOTIFY_ENDPOINT}/me/player/recently-played`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    limit: 20,
                },
            }
        );

        return data as TrackHistory;
    } catch (error) {
        throw new Error("Error getting recently played history: " + error);
    }
};