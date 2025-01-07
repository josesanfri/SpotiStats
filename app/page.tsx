import HomeCta from "@/components/home/home-cta";
import HomeFeatures from "@/components/home/home-features";
import HomeHero from "@/components/home/home-hero";
import HowItWorks from "@/components/home/how-it-works";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Home - SpotiStats",
    description: "Discover your stats on Spotify.",
};

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeFeatures />
      <HowItWorks />
      <HomeCta />
    </main>
  );
}
