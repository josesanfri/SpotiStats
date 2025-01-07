const steps = [
    {
        step: 1,
        title: "Connect your account",
        description: "Log in to your Spotify account to get started.",
    },
    {
        step: 2,
        title: "Analyse your data",
        description:
            "We process your history and generate detailed statistics.",
    },
    {
        step: 3,
        title: "Discover insights",
        description:
            "Explore visualisations and discover patterns in your music.",
    },
];

const HowItWorks = () => {
    return (
        <section className="px-4 lg:px-8 py-20">
            <article className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                    How it works
                </h2>
                <section className="grid md:grid-cols-3 gap-8">
                    {steps.map((step) => (
                        <div
                            key={step.step}
                            className="flex flex-col items-center text-center gap-4"
                        >
                            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                {step.step}
                            </div>
                            <h3 className="text-xl font-semibold">
                                {step.title}
                            </h3>
                            <p className="text-muted-foreground">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </section>
            </article>
        </section>
    );
};

export default HowItWorks;
