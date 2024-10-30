import Link from "next/link";
import { Separator } from "./ui/separator";

const links = [
	{ id: 1, name: "Home", href: "/" },
];

const Footer = () => {
	return (
		<footer className="mt-4">
			<section className="w-full max-w-screen-xl p-4 mx-auto md:py-8">
				<article className="sm:flex sm:items-center sm:justify-between">
					<p className="font-bold">
						SpotiStats
					</p>
					<ul className="flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400">
						{links.map((link) => (
							<li key={link.id}>
								<Link href={link.href} className="hover:underline me-4 md:me-6">
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				</article>
				<Separator className="my-6 lg:my-8 sm:mx-auto bg-gray-200 dark:bg-gray-700" />
				<span className="block text-sm font-medium text-center text-gray-500 dark:text-gray-400">
					&copy; {new Date().getFullYear()} Made by Jose Sánchez.
				</span>
			</section>
		</footer>
	);
};

export default Footer;  