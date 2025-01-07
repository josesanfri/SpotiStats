import FeatureCard from "@/components/feature-card";
import {
    TrendingUp,
    LineChart,
    User,
} from "lucide-react";

const features = [
    {
        icon: <TrendingUp className="h-8 w-8" />,
        title: "Personal Trends",
        description:
            "Visualise how your musical taste evolves over time.",
    },
    {
        icon: <LineChart className="h-8 w-8" />,
        title: "Gender analysis",
        description: "Find out which music genres dominate your library.",
    },
    {
        icon: <User className="h-8 w-8" />,
        title: "Customised profile",
        description: "Your unique music profile based on your Spotify data.",
    },
];

const HomeFeatures = () => {
    return (
        <section className="px-4 lg:px-8 py-20 bg-muted/50">
            <h2 className="text-3xl font-bold text-center mb-12">
                Main features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </div>
        </section>
    );
};

export default HomeFeatures;
