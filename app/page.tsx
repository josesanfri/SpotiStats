import HomeCard from "@/components/home-card";
import HomeInfo from "@/components/home-info";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Home - SpotiStats",
    description: "Discover your stats on Spotify.",
};

export default function Home() {
  return (
    <main>
      <HomeCard />
      <HomeInfo />
    </main>
  );
}
