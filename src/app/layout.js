import "./globals.css";
import { Nunito } from "next/font/google";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
	title: "Health Lab.",
	description: "Smemobox designers",
};

export default function RootLayout({ children }) {
	return (
		<html lang="it">
			<body className={font.className}>{children}</body>
		</html>
	);
}
