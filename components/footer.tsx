"use client";
import { Github } from "lucide-react";
import { Button } from "./ui/button";

const links = [
    {
        id: 1,
        href: "https://github.com/josesanfri/SpotiStats",
        text: "Star on Github",
        icon: <Github className="h-6 w-6" />,
    },
];

const Footer = () => {
    return (
        <footer className="w-full border-t bottom-0">
            <section className="max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <article className="flex items-center mb-4 sm:mb-0 space-x-3">
                        <a
                            href="htttps://portfolio-jsf.vercel.app"
                            className="hover:underline"
                        >
                            © {new Date().getFullYear()} Made by Jose Sánchez™
                        </a>
                    </article>

                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
                        {links.map((link) => (
                            <li key={link.id}>
                                <Button
                                    onClick={() => window.open(link.href, "_blank")}
                                    className="flex items-end space-x-2"
                                >
                                    {link.icon}
                                    {link.text}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
