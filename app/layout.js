import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mandarin Mastery: Your Personalized Chinese Learning Platform",
  description: "Welcome to Mandarin Mastery, your ultimate destination for mastering Chinese Mandarin in an interactive and engaging way! Mandarin Mastery is a web application designed to make learning Mandarin fun, efficient, and personalized. Whether you're a beginner or looking to improve your existing skills, Mandarin Mastery has something for everyone.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
