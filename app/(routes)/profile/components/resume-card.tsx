"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTopTrack } from "@/hooks/useGetTracks";
import { useGetTopArtist } from "@/hooks/useGetArtists";

import Image from "next/image";

const ResumeCard = () => {
    const { data: track, loading: loadingTrack } = useGetTopTrack();
    const { data: artist, loading: loadingArtist } = useGetTopArtist();

    return (
        <section className="p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
            <Card className="w-fit-content">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Top picks - Last month
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-3">
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">Track</h3>
                        <div className="flex items-center">
                            {!loadingTrack && track && (
                                <article className="flex flex-col gap-4">
                                    <Image
                                        src={track.album.images[0].url}
                                        alt={track.name}
                                        width={500}
                                        height={500}
                                        className="w-12 h-12"
                                    />
                                    <p className="font-medium">
                                        {track.name} -{" "}
                                        {track.album.artists[0].name}
                                    </p>
                                </article>
                            )}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">Artist</h3>
                        <div className="flex items-center">
                            {!loadingArtist && artist && (
                                <article className="flex flex-col gap-4">
                                    <Image
                                        src={artist.images[0].url}
                                        alt={artist.name}
                                        width={500}
                                        height={500}
                                        className="w-12 h-12"
                                    />
                                    <p className="font-medium">{artist.name}</p>
                                </article>
                            )}
                        </div>
                    </section>
                </CardContent>
            </Card>
        </section>
    );
};
export default ResumeCard;
