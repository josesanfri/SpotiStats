"use client";

import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

const ErrorPage = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center text-center space-y-8">
                <div className="relative">
                    <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-muted-foreground/20 animate-pulse" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-destructive flex items-center justify-center text-destructive-foreground">
                        !
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        ¡Oops! Something has gone wrong
                    </h1>
                    <p className="text-muted-foreground max-w-[500px]">
                        Sorry, an unexpected error has occurred. Please try
                        again or return to the main page.
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button asChild>
                        <Link href="/">
                            <HomeIcon className="mr-2 h-4 w-4" />
                            Back to home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
