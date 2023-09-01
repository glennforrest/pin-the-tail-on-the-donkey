import "./globals.css";
import { Inter, Dancing_Script } from "next/font/google";

export const metadata = {
  title: "Pin the tail on the donkey",
  description: "Pin that shit",
};

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing-script',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dancingScript.className} ${dancingScript.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
