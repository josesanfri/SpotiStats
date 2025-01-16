import { auth } from "@/auth";
import HomeCta from "@/components/home/home-cta";
import HomeFeatures from "@/components/home/home-features";
import HomeHero from "@/components/home/home-hero";
import HowItWorks from "@/components/home/how-it-works";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Home - SpotiStats",
    description: "Discover your stats on Spotify.",
};

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <HomeHero session={session} />
      <HomeFeatures />
      <HowItWorks />
      <HomeCta session={session} />
    </main>
  );
}
