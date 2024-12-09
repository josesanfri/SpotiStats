'use client';
import { useGetUser } from "@/hooks/useGetUser";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import AuthBtn from "./auth-btn";

const HomeCard = () => {
    const { data } = useGetUser();
    return (
        <section className="p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
            <Card className="items-center bg-neutral-400 dark:bg-neutral-900 text-center flex flex-col">
                <CardHeader>
                    <CardTitle className="text-2xl sm:text-3xl text-center">SpotiStats</CardTitle>
                    <CardDescription className="text-black dark:text-white">Choose what you want to see</CardDescription>
                </CardHeader>
                <CardContent>
                    {data ? (
                        <div className="grid w-full items-center gap-4">
                            <Button variant="outline">
                                <Link href={'/track'}>
                                    Top tracks
                                </Link>
                            </Button>
                            <Button variant="outline">
                                <Link href={'/artist'}>
                                    Top artists
                                </Link>
                            </Button>
                            <Button variant="outline">
                                <Link href={'/genre'}>
                                    Top genres
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <AuthBtn />
                    )}
                </CardContent>
            </Card>
        </section>
    )
}

export default HomeCard;