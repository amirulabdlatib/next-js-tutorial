import Link from "next/link";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["200", "400", "700"],
    display: "swap",
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} font-sans`}>
                <header>
                    <nav>
                        <Link href="/" className="nav-link">
                            Home
                        </Link>
                        <div>
                            <Link href="/register" className="nav-link">
                                Register
                            </Link>
                            <Link href="/dashboard" className="nav-link">
                                Dashboard
                            </Link>
                        </div>
                    </nav>
                </header>
                <main>{children}</main>
                <footer>footer</footer>
            </body>
        </html>
    );
}
