import { Artist } from "@/types/spotify";

/**
 * Calculates the count of each genre from a list of Spotify artists.
 *
 * This function iterates through the provided list of artists, counts the occurrences
 * of each genre, and returns a sorted array of genres by their count in descending order.
 *
 * @param artists - An array of Spotify artist objects containing genre information.
 * @returns An array of objects, each containing a genre and its corresponding count, sorted by count in descending order.
 */
export const getGenreCounts = (artists: Artist["items"]) => {
    const genreCountMap: { [key: string]: number } = {};

    artists.forEach((artist) => {
        artist.genres.forEach((genre) => {
            genreCountMap[genre] = (genreCountMap[genre] || 0) + 1;
        });
    });

    return Object.entries(genreCountMap)
        .map(([genre, count]) => ({ genre, count }))
        .sort((a, b) => b.count - a.count);
};