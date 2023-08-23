import { Inter, Train_One } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const train_one = Train_One({
    subsets: ["latin"],
    display: "swap",
    weight: "400",
    variable: "--font-train-one",
});

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.className} ${train_one.variable} `}>
                {children}
            </body>
        </html>
    );
}
