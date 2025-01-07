import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const HomeCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <Card>
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardContent>
        </Card>
    );
};

export default HomeCard;
