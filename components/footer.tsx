import Link from "next/link";

const links = [{ id: 1, name: "Home", href: "/" }];

const Footer = () => {
    return (
        <footer className="w-full border-t bottom-0">
            <section className="max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
					<article className="flex items-center mb-4 sm:mb-0 space-x-3">
						<Link href="htttps://portfolio-jsf.vercel.app" className="hover:underline">
							© {new Date().getFullYear()} Made by Jose Sánchez™
						</Link>
                    </article>

					<ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
						{links.map((link) => (
							<li key={link.id}>
								<Link href={link.href} className="hover:underline me-4 md:me-6">
									{link.name}
								</Link>
							</li>
						))}
					</ul>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
